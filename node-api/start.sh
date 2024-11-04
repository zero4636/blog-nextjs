#!/bin/bash

# Define the log files
LOG_FILE="app.log"
ERROR_LOG_FILE="error.log"
PID_FILE="app.pid"

# Check if the PID file exists and is not empty
if [ -f "$PID_FILE" ] && [ -s "$PID_FILE" ]; then
    # Read the PID from the file
    CURRENT_PID=$(cat "$PID_FILE")
    echo "The application is already running with PID $CURRENT_PID."
    exit 1
fi

# Start the Node.js application in the background and save the PID
nohup node app.js > "$LOG_FILE" 2> "$ERROR_LOG_FILE" &
echo $! > "$PID_FILE"  # Save the PID to a file

echo "Node.js application started with PID $!"