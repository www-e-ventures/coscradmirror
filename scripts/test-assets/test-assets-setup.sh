#!/bin/bash

set -e

ORIGIN_DIR="./scripts/test-assets/public-assets"
DESTINATION_DIR="./dist"

# Check if dist dir exists
if [ ! -d "$DESTINATION_DIR" ]; then
  mkdir $DESTINATION_DIR
  echo "Created compilation directory $DESTINATION_DIR"
fi

# Copy testing assets folder to dist for ServeStatic public access
cp -R $ORIGIN_DIR $DESTINATION_DIR
echo "Copied public-assets to directory $DESTINATION_DIR"

