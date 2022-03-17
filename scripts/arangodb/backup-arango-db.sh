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

DB_BACKUP_SCRIPT="$ARANGO_DOCKER_VOLUME_DESTINATION/arango/arango-backup.sh"

sudo -u root docker exec -it $ARANGO_DB_SERVER /bin/sh $DB_BACKUP_SCRIPT
