print(">> Running Setup in Arangosh");

const users = require('@arangodb/users');

users.save(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_USER_PASSWORD);

db._createDatabase(process.env.ARANGO_DB_NAME);
users.grantDatabase(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_NAME, 'rw');

db._useDatabase(process.env.ARANGO_DB_NAME);

const testData = require(process.env.ARANGO_DOCKER_VOLUME_SCRIPTS_DIR + '/test-data/testData.json');

const collectionNames = Object.keys(testData);

// Add Collections and data
collectionNames.forEach(collectionName => {
  print(`Attempting to add collection "${collectionName}" to ${process.env.ARANGO_DB_NAME}`);
  // TODO: need to pass in collection type document or edge
  if (db._create(collectionName)) {
    print(`Created Collection ${collectionName}`);
    print(`Attempting to add data to collection "${collectionName}"`);
    const data = testData[collectionName];
    data.forEach(document => {
      const keys = Object.keys(document);
      if (keys.includes('id')) {
        document._key = document.id;
        delete document.id;
        print(`Converted ${collectionName} document id to "_key": "${document._key}" for insertion into ${process.env.ARANGO_DB_NAME}`);
      }

      if (db._collection(collectionName).save(document)) {
        print(`Added document to Collection ${collectionName}`);
      }
      else {
        print(`Document could not be added to "${collectionName}"`);
      }
    });
  }
  else {
    print(`Collection "${collectionName}" could not be created`);
  }

});
