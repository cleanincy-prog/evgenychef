#!/usr/bin/env node
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { spawn, execFile } from "node:child_process";
import { closeSync, openSync } from "node:fs";
import { mkdir, open, readFile, realpath, rename, stat, unlink, writeFile } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(ROOT, "scripts/local-server.mjs");
const CLI = path.join(ROOT, "node_modules/vinext/dist/cli.js");
const URL = "http://127.0.0.1:3004";
const PORT = 3004;
const work = path.join(ROOT, "work");
const logDirectory = path.join(work, "log");
const pidPath = path.join(work, "local-server.pid.json");
const lockPath = path.join(work, "local-server.operation.lock");
const stdoutPath = path.join(logDirectory, "local-server.stdout.log");
const stderrPath = path.join(logDirectory, "local-server.stderr.log");
const cliArguments = [CLI, "dev", "--hostname", "127.0.0.1", "--port", String(PORT)];
const expectedCommandTail = cliArguments.join(" ");
const run = promisify(execFile);
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const uid = process.getuid();
const normalize = value => value.trim().replace(/\s+/g, " ");

async function command(binary, args) {
  try {
    return (await run(binary, args, { cwd: ROOT, env: { ...process.env, LC_ALL: "en_US.UTF-8", LANG: "en_US.UTF-8" }, encoding: "utf8", timeout: 5000, maxBuffer: 1024 * 1024 })).stdout;
  } catch (error) {
    if (error.code === 1 && !error.stderr?.trim()) return "";
    throw error;
  }
}

async function processDetails(pid) {
  if (!Number.isSafeInteger(pid) || pid <= 1) return null;
  const line = normalize(await command("/bin/ps", ["-ww", "-p", String(pid), "-o", "pid=", "-o", "uid=", "-o", "pgid=", "-o", "lstart=", "-o", "command="]));
  if (!line) return null;
  const fields = line.split(" ");
  return { pid: Number(fields[0]), uid: Number(fields[1]), pgid: Number(fields[2]), startStamp: fields.slice(3, 8).join(" "), command: fields.slice(8).join(" ") };
}

async function processCwd(pid) {
  const lines = (await command("/usr/sbin/lsof", ["-a", "-p", String(pid), "-d", "cwd", "-Fn"])).split("\n");
  return lines.find(line => line.startsWith("n"))?.slice(1) || null;
}

async function readRecord() {
  try {
    const metadata = await stat(pidPath);
    assert.equal(metadata.uid, uid, "PID-файл принадлежит другому пользователю; процессы не затронуты.");
    const record = JSON.parse(await readFile(pidPath, "utf8"));
    assert.equal(record.root, ROOT, "PID-файл относится к другой папке; процессы не затронуты.");
    assert.equal(record.uid, uid, "UID в PID-файле не совпадает; процессы не затронуты.");
    assert.equal(record.cli, CLI, "PID-файл содержит чужую команду; процессы не затронуты.");
    assert.ok(Number.isSafeInteger(record.pid) && record.pid > 1, "Некорректный PID-файл.");
    return record;
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function inspectOwnership(record) {
  const actual = await processDetails(record.pid);
  if (!actual) return { owned: false, running: false, reason: "Процесс завершён." };
  if (actual.uid !== uid || actual.pgid !== record.pid || record.pgid !== record.pid || actual.startStamp !== record.startStamp || actual.command !== record.command || !actual.command.endsWith(expectedCommandTail)) {
    return { owned: false, running: true, reason: "PID/UID, группа, время старта или команда не совпадают." };
  }
  if (await processCwd(record.pid) !== ROOT) return { owned: false, running: true, reason: "Рабочая папка процесса не совпадает." };
  return { owned: true, running: true, actual };
}

async function portIsBusy() {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host: "127.0.0.1", port: PORT });
    socket.setTimeout(1500);
    socket.once("connect", () => { socket.destroy(); resolve(true); });
    socket.once("error", error => {
      socket.destroy();
      if (error.code === "ECONNREFUSED") resolve(false);
      else reject(error);
    });
    socket.once("timeout", () => { socket.destroy(); reject(new Error("Не удалось проверить локальный порт 3004.")); });
  });
}

async function ownsListeners(record) {
  const lines = (await command("/usr/sbin/lsof", ["-nP", `-iTCP:${PORT}`, "-sTCP:LISTEN", "-Fpn"])).split("\n");
  let pid;
  const listeners = [];
  for (const line of lines) {
    if (line.startsWith("p")) pid = Number(line.slice(1));
    if (line.startsWith("n") && pid) listeners.push({ pid, address: line.slice(1) });
  }
  if (!listeners.length) return false;
  for (const listener of listeners) {
    if (listener.address !== `127.0.0.1:${PORT}`) return false;
    const process = await processDetails(listener.pid);
    if (!process || process.uid !== uid || process.pgid !== record.pid) return false;
  }
  return true;
}

async function httpReady(record) {
  if (!(await inspectOwnership(record)).owned || !await ownsListeners(record)) return false;
  try {
    const response = await fetch(URL, { redirect: "error", signal: AbortSignal.timeout(4000) });
    const body = await response.text();
    return response.status === 200 && response.headers.get("x-robots-tag")?.includes("noindex") && body.includes("/media/chef-story-img-5399-no-grill.mp4");
  } catch { return false; }
}

async function saveRecord(record) {
  const temporary = `${pidPath}.${process.pid}.tmp`;
  await writeFile(temporary, JSON.stringify(record, null, 2) + "\n", { mode: 0o600 });
  await rename(temporary, pidPath);
}

async function prepareDirectories() {
  await Promise.all([work, logDirectory, ".tmp", ".local-cache", ".local-config", ".npm-cache", ".wrangler/registry"].map(directory => mkdir(path.isAbsolute(directory) ? directory : path.join(ROOT, directory), { recursive: true })));
}

async function withOperationLock(operation) {
  await prepareDirectories();
  const token = randomUUID();
  let handle;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      handle = await open(lockPath, "wx", 0o600);
      await handle.writeFile(JSON.stringify({ pid: process.pid, uid, root: ROOT, token }) + "\n");
      break;
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      const lock = JSON.parse(await readFile(lockPath, "utf8"));
      if (lock.root !== ROOT || lock.uid !== uid || await processDetails(lock.pid)) throw new Error("Уже выполняется запуск или остановка. Подождите завершения операции.");
      await unlink(lockPath);
    }
  }
  if (!handle) throw new Error("Не удалось получить локальную блокировку запуска.");
  try { return await operation(); }
  finally {
    await handle.close();
    const current = JSON.parse(await readFile(lockPath, "utf8").catch(() => "{}"));
    if (current.token === token) await unlink(lockPath);
  }
}

async function stopOwned(record) {
  const ownership = await inspectOwnership(record);
  if (!ownership.owned) {
    if (ownership.running) throw new Error(`Остановка отменена: ${ownership.reason} Посторонний процесс не затронут.`);
    await unlink(pidPath).catch(error => { if (error.code !== "ENOENT") throw error; });
    return;
  }
  // A detached session has PGID == PID. Validate the owner immediately before
  // signalling its group, which also includes this server's local workerd child.
  process.kill(-record.pid, "SIGTERM");
  for (let attempt = 0; attempt < 40; attempt++) {
    if (!await processDetails(record.pid)) {
      await unlink(pidPath).catch(error => { if (error.code !== "ENOENT") throw error; });
      return;
    }
    await delay(250);
  }
  // Never signal a PID or group reused by another process after shutdown.
  if (!(await inspectOwnership(record)).owned) throw new Error("Принадлежность процесса изменилась; принудительная остановка отменена.");
  process.kill(-record.pid, "SIGKILL");
  for (let attempt = 0; attempt < 20; attempt++) {
    if (!await processDetails(record.pid)) {
      await unlink(pidPath).catch(error => { if (error.code !== "ENOENT") throw error; });
      return;
    }
    await delay(250);
  }
  throw new Error("Процесс ещё завершается. Проверьте status; PID-файл сохранён.");
}

async function start() {
  return withOperationLock(async () => {
    const previous = await readRecord();
    if (previous) {
      const owner = await inspectOwnership(previous);
      if (owner.owned) {
        if (await httpReady(previous)) { console.log(`Сервер уже работает: ${URL} (PID ${previous.pid}).`); return; }
        throw new Error(`Свой процесс PID ${previous.pid} работает, но HTTP ещё не готов. Проверьте status и ${stderrPath}. Второй сервер не запущен.`);
      }
      // Reused PIDs are not ours. Preserve the old record for diagnosis without
      // sending any signal or changing an unrelated running process.
      await rename(pidPath, path.join(work, `local-server.stale-${Date.now()}.json`));
    }
    if (await portIsBusy()) throw new Error(`Порт 127.0.0.1:${PORT} занят другим процессом. Он не остановлен; новый сервер не запущен.`);
    assert.ok((await realpath(CLI)).startsWith(ROOT + path.sep), "Vinext CLI должен находиться внутри независимой копии.");
    const environment = {
      ...process.env,
      TMPDIR: path.join(ROOT, ".tmp"),
      XDG_CACHE_HOME: path.join(ROOT, ".local-cache"),
      XDG_CONFIG_HOME: path.join(ROOT, ".local-config"),
      npm_config_cache: path.join(ROOT, ".npm-cache"),
      WRANGLER_SEND_METRICS: "false",
      WRANGLER_WRITE_LOGS: "false",
      WRANGLER_LOG_PATH: path.join(ROOT, ".wrangler/wrangler.log"),
      MINIFLARE_REGISTRY_PATH: path.join(ROOT, ".wrangler/registry"),
      BROWSER: "none",
    };
    const out = openSync(stdoutPath, "a", 0o600);
    const err = openSync(stderrPath, "a", 0o600);
    let child;
    try {
      child = spawn(process.execPath, cliArguments, { cwd: ROOT, env: environment, detached: true, stdio: ["ignore", out, err] });
      await new Promise((resolve, reject) => { child.once("spawn", resolve); child.once("error", reject); });
      child.unref();
    } finally { closeSync(out); closeSync(err); }
    const actual = await processDetails(child.pid);
    if (!actual || actual.uid !== uid || actual.pgid !== child.pid || !actual.command.endsWith(expectedCommandTail)) throw new Error(`Процесс не подтвердил запуск. См. ${stderrPath}.`);
    const record = { root: ROOT, uid, pid: child.pid, pgid: actual.pgid, startStamp: actual.startStamp, command: actual.command, cli: CLI, node: process.execPath, url: URL, startedAt: new Date().toISOString(), stdout: stdoutPath, stderr: stderrPath };
    await saveRecord(record);
    console.log(`Запуск локального сервера… PID ${record.pid}`);
    const deadline = Date.now() + 60_000;
    while (Date.now() < deadline) {
      if (!(await inspectOwnership(record)).owned) throw new Error(`Сервер завершился до готовности. См. ${stderrPath}.`);
      if (await httpReady(record)) { console.log(`Готово: ${URL}\nСервер работает независимо от окна Codex/терминала.\nЛоги: ${logDirectory}`); return; }
      await delay(500);
    }
    await stopOwned(record);
    throw new Error(`Сервер не ответил за 60 секунд и был остановлен. См. ${stderrPath}.`);
  });
}

async function status() {
  const record = await readRecord();
  if (!record) {
    if (await portIsBusy()) { console.log(`Порт 127.0.0.1:${PORT} занят процессом вне launcher. Ничего не остановлено.`); process.exitCode = 2; }
    else { console.log("Локальный сервер остановлен. Запуск: Start-local.command"); process.exitCode = 1; }
    return;
  }
  const owner = await inspectOwnership(record);
  if (!owner.owned) { console.log(`Сохранённый PID ${record.pid} не является работающим сервером этой копии. ${owner.reason}`); process.exitCode = 1; return; }
  const ready = await httpReady(record);
  console.log(`${ready ? "Работает" : "Процесс запущен, HTTP не готов"}: ${URL}\nPID: ${record.pid}\nПапка: ${ROOT}\nЛоги: ${logDirectory}`);
  if (!ready) process.exitCode = 1;
}

async function stop() {
  return withOperationLock(async () => {
    const record = await readRecord();
    if (!record) { console.log("У launcher нет работающего сервера. Посторонние процессы не затронуты."); return; }
    await stopOwned(record);
    console.log(`Локальный сервер этой копии остановлен. Адрес ${URL} больше не обслуживается этим процессом.`);
  });
}

try {
  assert.equal(await realpath(path.dirname(path.dirname(fileURLToPath(import.meta.url)))), ROOT, "Launcher разрешён только внутри указанной локальной копии.");
  assert.equal(await realpath(script), script, "Launcher не должен быть симлинком.");
  const action = process.argv[2] || "status";
  if (action === "start") await start();
  else if (action === "status") await status();
  else if (action === "stop") await stop();
  else { console.log("Использование: node scripts/local-server.mjs start|status|stop"); process.exitCode = action === "help" || action === "--help" ? 0 : 1; }
} catch (error) {
  console.error(`Локальный сервер: ${error.message}`);
  process.exitCode = 1;
}
