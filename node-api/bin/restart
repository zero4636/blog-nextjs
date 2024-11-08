#!/bin/bash
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
DIR=$(dirname "$SCRIPT_DIR")
APP_NAME="node-api"
LOG_DIR="${DIR}/logs"
OUTPUT_LOG="${LOG_DIR}/${APP_NAME}_output.log"
ERROR_LOG="${LOG_DIR}/${APP_NAME}_error.log"

mkdir -p "$LOG_DIR"

echo "Restarting application $APP_NAME..."
pm2 restart "$APP_NAME" --output "$OUTPUT_LOG" --error "$ERROR_LOG"
