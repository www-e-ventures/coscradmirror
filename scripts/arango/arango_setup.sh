#!/bin/sh

arangosh --server.database _system \
--server.authentication true \
--server.username root \
--server.password $ARANGO_ROOT_PASSWORD \
--console.history false \
--javascript.execute /home/arango-volume-share/arango/setup.js
