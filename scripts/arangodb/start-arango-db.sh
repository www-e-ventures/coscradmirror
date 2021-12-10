#!/bin/bash

set -e

# Remember to set the following environment variables and to add their values to your .env in project root.
# ARANGO_DB_SERVER="dbserver";
# ARANGO_DB_ROOT_PASSWORD="rootPASSWORD";
# ARANGO_DB_USER="devtester";
# ARANGO_DB_USER_PASSWORD="confidential"
# ARANGO_DB_NAME="testdb";

echo "echo stop & remove old docker [$ARANGO_DB_SERVER] and starting new fresh instance of [$ARANGO_DB_SERVER]"
(docker kill $ARANGO_DB_SERVER || :) && \
  (docker rm $ARANGO_DB_SERVER || :) && \
  docker run -e ARANGO_ROOT_PASSWORD=$ARANGO_DB_ROOT_PASSWORD --name $ARANGO_DB_SERVER -p $ARANGO_DB_PORT:8529 -d arangodb

# wait for pg to start
echo "sleep wait for arango-db-server [$ARANGO_DB_SERVER] to start";
sleep 3;

# TODO
# create the db 
# set environment variables
# create new db through arangosh 