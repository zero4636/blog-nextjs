#!/bin/bash
APP_NAME="node-api"

echo "Stopping application $APP_NAME..."
pm2 stop "$APP_NAME"
