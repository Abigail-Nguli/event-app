#!/bin/bash
echo "Checking for db.json..."
if [ -f "db.json" ]; then
  echo "db.json found!"
  exit 0
else
  echo "ERROR: db.json missing!"
  ls -la
  exit 1
fi