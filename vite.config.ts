import vinext from "vinext";
import { sites } from "@openai/sites-vite-plugin";
import { defineConfig, type Plugin } from "vite";
import { renameSync } from "node:fs";
import { resolve } from "node:path";

function routeMediaThroughWorker(): Plugin {
  return {
    name: "route-media-through-worker",
    apply: "build",
    closeBundle: {
      order: "post",
      sequential: true,
      handler() {
        if (this.environment.name !== "client") return;
        const output = resolve(this.environment.config.root, this.environment.config.build.outDir);
        // Sites serves matching assets before the application, including when
        // run_worker_first/_headers are supplied. Keep public /media URLs in
        // the Worker by storing the unchanged files under a different prefix.
        renameSync(resolve(output, "media"), resolve(output, "_site-media"));
      },
    },
  };
}

// Local preview stays on loopback; Sites publishes the same source to evgenychef.com.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";
const localBindingConfig = {
  name: "evening-plan-local",
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  workers_dev: false,
  assets: { binding: "ASSETS", run_worker_first: ["/media/*"] },
  d1_databases: [],
  r2_buckets: [],
};

export default defineConfig(async () => {
  // Keep local runtime state and logs inside this independent copy.
  process.env.WRANGLER_SEND_METRICS = "false";
  process.env.WRANGLER_WRITE_LOGS = "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    server: {
      host: "127.0.0.1",
      port: 3004,
      strictPort: true,
      headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
      ...(isCodexSeatbeltSandbox
        ? { watch: { useFsEvents: false, usePolling: true } }
        : {}),
    },
    preview: {
      host: "127.0.0.1",
      port: 3004,
      strictPort: true,
      headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
    },
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        remoteBindings: false,
        tunnel: false,
        inspectorPort: false,
        persistState: { path: ".wrangler/state" },
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
      routeMediaThroughWorker(),
    ],
  };
});
