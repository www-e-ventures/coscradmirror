#!/bin/sh

DATABASE="_system"
USER="root"
PASSWORD=$ARANGO_ROOT_PASSWORD

if [ $1 != "load_data" ];
then
  if [ $1 = "test_connection" ];
  then
    ARANGOSH_SCRIPT="check-arangosh-connection.js";
  elif [ $1 = "load_collections" ];
  then
    ARANGOSH_SCRIPT="setup.js";
  fi
  # Connect to arangodb and run the arangosh setup script to load data
  arangosh \
  --server.authentication true \
  --server.database $DATABASE \
  --server.username $USER \
  --server.password $PASSWORD \
  --console.history false \
  --javascript.execute $ARANGO_DOCKER_VOLUME_SCRIPTS_DIR/$ARANGOSH_SCRIPT
else
  ARANGOSH_SCRIPT="load.js";
  DATABASE=$ARANGO_DB_NAME;
  USER=$ARANGO_DB_USER;
  PASSWORD=$ARANGO_DB_USER_PASSWORD;
fi


if [ $1 = "load_data" ];
then
  # collections="terms vocabulary_lists";
  set --  terms vocabulary_lists
  for collection in "$@";
  do
    echo "Collection: $collection";
    arangoimport \
     --file "$ARANGO_DOCKER_VOLUME_SCRIPTS_DIR/data/test-data-$collection.json" \
     --type json \
     --collection $collection \
    --server.authentication true \
    --server.database $DATABASE \
    --server.username $USER \
    --server.password $PASSWORD
  done
fi
