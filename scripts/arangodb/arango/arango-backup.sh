#!/bin/bash

set -e

echo "making backup of arango data..."

DATE=`date +"%Y-%m-%d--%H-%M-%S"`
echo "Date: $DATE"

arangodump \
--output-directory "$ARANGO_DOCKER_VOLUME_DESTINATION/database-backup/$DATE" \
--server.database $ARANGO_DB_NAME \
--server.username $ARANGO_DB_USER \
--server.password $ARANGO_DB_USER_PASSWORD
