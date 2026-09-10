# Mise en place — «План вечера», Шеф4

Реализация одобренного макета для просмотра на этом компьютере. Рабочая папка:

`/Users/dmitro/Documents/ChatGPT/Шеф4`

## Запуск

Для обычного просмотра дважды откройте **`Start-local.command`** в этой папке. Он запускает независимый локальный сервер, дожидается ответа страницы и открывает **http://127.0.0.1:3004** в браузере. После этого окно терминала и Codex можно закрыть: сервер продолжает работать до явной остановки, выхода из учётной записи или перезагрузки компьютера.

Для остановки дважды откройте **`Stop-local.command`**. Автозапуска при входе в систему нет. После перезагрузки снова откройте `Start-local.command`.

Те же действия из терминала:

```bash
cd "/Users/dmitro/Documents/ChatGPT/Шеф4"
node scripts/local-server.mjs start
node scripts/local-server.mjs status
node scripts/local-server.mjs stop
```

Launcher запускает установленный Vinext напрямую через Node с адресом `127.0.0.1:3004`. При занятом сторонним процессом порте он не запускает второй сервер и никого не останавливает. Перед остановкой проверяются PID, UID, группа процесса, время старта, команда и рабочая папка. PID-файл: `work/local-server.pid.json`; вывод сервера: `work/log/local-server.stdout.log` и `work/log/local-server.stderr.log`. Все зависимости, кэши и временные файлы остаются внутри этой копии.

Нужен Node.js 22.13 или новее. Зависимости уже установлены. Если потребуется установить их заново:

```bash
cd "/Users/dmitro/Documents/ChatGPT/Шеф4"
mkdir -p .tmp .local-cache .local-config
TMPDIR="$PWD/.tmp" XDG_CACHE_HOME="$PWD/.local-cache" XDG_CONFIG_HOME="$PWD/.local-config" npm install
```

Для разработки в открытом терминале доступен `npm run dev`; перед ним остановите фоновый сервер командой `node scripts/local-server.mjs stop`. Такой ручной dev-сеанс завершается через `Ctrl+C` и зависит от своего терминала.

## Проверка сборки

```bash
npm run lint
npm test
node node_modules/typescript/bin/tsc --noEmit --incremental false
node scripts/visual-qa.mjs
```

Для HTTP-тестов и визуальной проверки локальный сервер должен работать: используйте `Start-local.command` или `node scripts/local-server.mjs start`. `npm test` включает локальную сборку и пять HTTP-тестов. Визуальная проверка использует установленный Google Chrome, сохраняет семь полных скриншотов (1440, 1280, 1024, 768, 430, 390, 375 px), проверяет клавиатуру и видео. Все результаты — в `artifacts/evening-plan-local/`; профиль тестового браузера — в `work/.tmp/`.

Результат сборки хранится только в `dist/` этой копии. Для локального просмотра готовой сборки: `npm run start` (сначала остановите dev-сервер на том же порту).

## Где что находится

- `app/` — интерфейс, стили и метаданные.
- `public/media/` — реальные фотографии и видео проекта; иллюстрации процесса подписаны отдельно в документации.
- `public/fonts/` — активный рукописный Caveat с кириллицей и латиницей; прежние гарнитуры сохранены как архивные ресурсы.
- `design/mockups/mise-en-place-evening-plan-2026-09-10/` — одобренные desktop/mobile макеты и описание.
- `docs/DESIGN_REFERENCE_MAP.md`, `docs/DESIGN_SYSTEM.md` — источники решений и система оформления.
- `ORIGINAL_INTEGRITY_BASELINE.json` — исходный снимок для проверки неизменности оригинала.
- `LOCAL_ONLY.md`, `AGENTS.md` — обязательные ограничения локальной работы.

## Публикация

Публичный адрес: **https://evgenychef.com**. GitHub: **https://github.com/cleanincy-prog/evgenychef**, ветка main.

Прямой запрос пользователя от 2026-09-11 разрешил заменить прежнюю версию текущим «Планом вечера» с Caveat. Старый локальный запрет публикации больше не действует.

`.openai/hosting.json` содержит идентификатор существующего Sites-проекта. Сборка использует @openai/sites-vite-plugin и Cloudflare Worker. Публикуются проверенные исходники и соответствующий им архив сборки; история Git и предыдущие версии Sites сохраняются. GitHub не запускает публикацию автоматически.

Публичные canonical, Open Graph, robots.txt и sitemap.xml используют evgenychef.com. Только loopback preview получает HTTP noindex. Start-local.command продолжает запускать сайт на 127.0.0.1:3004. Кэши, зависимости, PID, логи и секреты исключены из Git. Предыдущие локальные копии этой задачей не изменяются.

Подробности выпуска: `docs/RELEASE_2026-09-11.md`.
