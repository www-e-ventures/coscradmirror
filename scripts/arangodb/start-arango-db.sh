#!/bin/bash

set -e

# The following environment variables are required
# Add to your .env in project root.
#
# ARANGO_DB_SERVER="dbserver";
# ARANGO_DB_PORT="8529";
# ARANGO_DB_ROOT_PASSWORD="rootPASSWORD";
# ARANGO_DB_USER="devtester";
# ARANGO_DB_USER_PASSWORD="confidential"
# ARANGO_DB_NAME="coscradtestdb";

. ./scripts/arangodb/arango_setup_vars.sh

if [ $1 == "test_arango" ];
then
  echo "Setting up test data for ArangoDB";
  PROJECT_ROOT_PATH="$PWD";
  echo "PROJECT_ROOT_PATH: $PROJECT_ROOT_PATH"

  # Create arango volume share location
  if [ ! -d "$ARANGO_DOCKER_LOCAL_DIR" ]; then
    mkdir $ARANGO_DOCKER_LOCAL_DIR
    echo "Created local Docker share directory $ARANGO_DOCKER_LOCAL_DIR"
  fi


  if [ -d "$ARANGO_DOCKER_LOCAL_DIR/scripts/arango" ]; then
    echo "Deleting existing arango scripts directory in $ARANGO_DOCKER_LOCAL_DIR"
    sudo -u root rm -rf "$ARANGO_DOCKER_LOCAL_DIR/scripts/arango"
  fi

  # Copy Arango Test Data to local share location
  cp -R ./scripts/arango $ARANGO_DOCKER_LOCAL_DIR
  echo "Copied scripts to local Docker share directory $ARANGO_DOCKER_LOCAL_DIR"

  cd $ARANGO_DOCKER_LOCAL_DIR

  ARANGO_LOCAL_VOLUME_PATH="$PWD";
  echo "ARANGO_LOCAL_VOLUME_PATH: $ARANGO_LOCAL_VOLUME_PATH"

  cd $PROJECT_ROOT_PATH
fi

if [ $ARANGO_LOCAL_VOLUME_PATH != "" ];
then
  ARANGO_LOCAL_VOLUME_PATH_CMD=" -v $ARANGO_LOCAL_VOLUME_PATH:$ARANGO_DOCKER_VOLUME_DESTINATION";
  echo "ARANGO_LOCAL_VOLUME_PATH_CMD: $ARANGO_LOCAL_VOLUME_PATH_CMD"
else
  ARANGO_LOCAL_VOLUME_PATH_CMD="";
fi

echo "Check for instance of arango server"
DOCKER_PS=`sudo -u root docker ps`

if [ -z "${DOCKER_PS##*8529*}" ];
then
  echo "Existing docker arango container on port 8529";
  if [ -z "${DOCKER_PS##*$ARANGO_DB_SERVER*}" ];
  then
    echo "stop & remove old instance of docker arango $ARANGO_DB_SERVER container";
    (sudo -u root docker container stop $ARANGO_DB_SERVER || :) && \
      sudo -u root docker container rm $ARANGO_DB_SERVER
  else
    echo "Unknown arango container already running on port 8529";
    echo "";
    echo "EXITING SETUP";
    echo "";
    exit;
  fi
fi

wait
echo "Starting new fresh instance of [$ARANGO_DB_SERVER]"

sudo -u root docker run \
--name $ARANGO_DB_SERVER \
-e ARANGO_ROOT_PASSWORD=$ARANGO_DB_ROOT_PASSWORD \
-e ARANGO_DB_USER=$ARANGO_DB_USER \
-e ARANGO_DB_USER_PASSWORD=$ARANGO_DB_USER_PASSWORD \
-e ARANGO_DB_NAME=$ARANGO_DB_NAME \
-e ARANGO_DOCKER_VOLUME_DESTINATION=$ARANGO_DOCKER_VOLUME_DESTINATION \
-p $ARANGO_DB_PORT:8529 \
-d$ARANGO_LOCAL_VOLUME_PATH_CMD \
arangodb

# wait for pg to start
echo "Waiting for Arango DB to start"
wait

CONNECTION_TEST_SCRIPT="$ARANGO_DOCKER_VOLUME_DESTINATION/arango/arango-setup.sh test_connection"
DB_SETUP_SCRIPT="$ARANGO_DOCKER_VOLUME_DESTINATION/arango/arango-setup.sh load_data"

READY=0
until [ "$READY" = 1 ]
do
   DB_CONNECTION=$(sudo -u root docker exec -it $ARANGO_DB_SERVER $CONNECTION_TEST_SCRIPT)
   if [ -z "${DB_CONNECTION##*,connected*}" ];
   then
     echo "DB Connected: $DB_CONNECTION";
     echo "Loading data into arango-test db";
     sudo -u root docker exec -it $ARANGO_DB_SERVER $DB_SETUP_SCRIPT
     READY=1;
   else
     echo "Trying to connect, please wait...";
     sleep 1
   fi
done
