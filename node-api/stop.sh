#!/bin/bash

PID_FILE="app.pid"

# Check if the PID file exists
if [ ! -f "$PID_FILE" ]; then
    echo "PID file not found. Is the application running?"
    exit 1
fi

# Read the PID from the file
PID=$(cat "$PID_FILE")

kill -9 "$PID"
echo "Node.js application with PID $PID has been stopped."
rm "$PID_FILE"  # Remove the PID file after stopping

