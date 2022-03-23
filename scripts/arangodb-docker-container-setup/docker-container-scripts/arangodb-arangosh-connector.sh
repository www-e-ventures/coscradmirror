#!/bin/sh
# Docker container shell is Bourne Shell, not Bash

DATABASE="_system"
USER="root"
PASSWORD=$ARANGO_ROOT_PASSWORD

if [ $1 = "test_arangodb_connection" ];
then
  ARANGOSH_SCRIPT="js/check-arangosh-connection.js";
elif [ $1 = "load_collections" ];
then
  ARANGOSH_SCRIPT="js/setup.js";
fi

# Connect to arangodb and run the arangosh setup script to load data
arangosh \
--server.authentication true \
--server.database $DATABASE \
--server.username $USER \
--server.password $PASSWORD \
--console.history false \
--javascript.execute $ARANGODB_DESTINATION_CONTAINER_DOCKER_SHARED_VOLUME_SCRIPTS_PATH/$ARANGOSH_SCRIPT
