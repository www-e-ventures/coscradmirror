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

# TODO: CHECK FOR EXISTENCE OF ENV VARS
