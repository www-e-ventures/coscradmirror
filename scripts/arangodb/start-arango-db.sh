#!/bin/bash

set -e

# Remember to set the following environment variables and to add their values to your .env in project root.
# ARANGO_DB_SERVER="dbserver";
# ARANGO_DB_ROOT_PASSWORD="rootPASSWORD";
# ARRANGO_DB_USER="devtester";
# ARRANGO_DB_USER_PASSWORD="confidential"
# ARRANGO_DB_NAME="testdb";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run -e ARANGO_ROOT_PASSWORD=$ARANGO_DB_PASSWORD -p 8529:$ARANGO_DB_PORT -d arangodb

# wait for pg to start
echo "sleep wait for arango-db-server [$SERVER] to start";
SLEEP 3;

# TODO
# create the db 
# set environment variables
# create new db through arangosh 