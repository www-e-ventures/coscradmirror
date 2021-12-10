#!/bin/sh

if [ $1 == "test_connection" ];
then
  ARANGOSH_SCRIPT="check-arangosh-connection.js"
else
  ARANGOSH_SCRIPT="setup.js"
fi

# Connect to arangodb and run the arangosh setup script to load data
arangosh \
--server.authentication true \
--server.database _system \
--server.username root \
--server.password $ARANGO_ROOT_PASSWORD \
--console.history false \
--javascript.execute /home/arango-volume-share/arango/$ARANGOSH_SCRIPT
