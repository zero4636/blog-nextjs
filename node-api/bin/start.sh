#!/bin/bash
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
DIR=$(dirname "$SCRIPT_DIR")
APP_NAME="node-api"
APP_COMMAND="cd ${DIR} && node app.js --no-color"
LOG_DIR="${DIR}/logs"
OUTPUT_LOG="${LOG_DIR}/${APP_NAME}_output.log"
ERROR_LOG="${LOG_DIR}/${APP_NAME}_error.log"

mkdir -p "$LOG_DIR"

if pm2 list | grep -q "$APP_NAME"; then
    echo "The application $APP_NAME is already running. Skipping start."
else
    echo "Starting application $APP_NAME..."
    pm2 start "$APP_COMMAND" --name "$APP_NAME" --output "$OUTPUT_LOG" --error "$ERROR_LOG"
fi
