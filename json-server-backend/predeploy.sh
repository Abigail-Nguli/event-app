#!/bin/bash
echo "Checking for data.json..."
if [ -f "data.json" ]; then
  echo "data.json found!"
  exit 0
else
  echo "ERROR: data.json missing!"
  ls -la
  exit 1
fi