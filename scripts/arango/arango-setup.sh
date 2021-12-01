#!/bin/sh

# ARANGOSH_CMD="arangosh --server.password $ARANGO_ROOT_PASSWORD"
#
# echo "Run: $ARANGOSH_CMD"
# $ARANGOSH_CMD

arangosh \
--server.password $ARANGO_ROOT_PASSWORD \
--console.history false \
--javascript.execute /home/arango-volume-share/arango/setup.js
