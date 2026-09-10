#!/bin/zsh
set -eu
LOCAL_PROJECT_DIR="${0:A:h}"
cd -- "$LOCAL_PROJECT_DIR"
if [[ -x /usr/local/bin/node ]]; then
  LOCAL_NODE=/usr/local/bin/node
elif [[ -x /opt/homebrew/bin/node ]]; then
  LOCAL_NODE=/opt/homebrew/bin/node
else
  print -u2 "Не найден Node.js. Требуется Node.js 22.13 или новее."
  exit 1
fi
"$LOCAL_NODE" "$LOCAL_PROJECT_DIR/scripts/local-server.mjs" stop
