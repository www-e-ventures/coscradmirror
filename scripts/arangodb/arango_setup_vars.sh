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

ARANGO_DOCKER_LOCAL_DIR="../arango-volume-share";
ARANGO_DOCKER_VOLUME_DESTINATION="/home/arango-volume-share";
ARANGO_DOCKER_VOLUME_SCRIPTS_DIR="$ARANGO_DOCKER_VOLUME_DESTINATION/arango";

CONNECTION_TEST_SCRIPT="$ARANGO_DOCKER_VOLUME_SCRIPTS_DIR/arango-setup.sh test_connection"
DB_SETUP_SCRIPT="$ARANGO_DOCKER_VOLUME_SCRIPTS_DIR/arango-setup.sh load_collections"
DB_DATA_LOAD_SCRIPT="$ARANGO_DOCKER_VOLUME_SCRIPTS_DIR/arango-setup.sh load_data"

# TODO: CHECK FOR EXISTENCE OF ENV VARS
