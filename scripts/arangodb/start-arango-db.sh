#!/bin/bash

set -e

# Remember to set the following environment variables.
# SERVER="server";
# PW="confidential";
# DB="dbname";

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