print(">> Running Setup in Arangosh");

const users = require('@arangodb/users');

users.save(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_USER_PASSWORD);

db._createDatabase(process.env.ARANGO_DB_NAME);
users.grantDatabase(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_NAME, 'rw');

db._useDatabase(process.env.ARANGO_DB_NAME);

// TODO load this from separate file and link with app's list of db references
require("internal").load(process.env.ARANGO_DOCKER_VOLUME_SCRIPTS_DIR + "/data/testData.js");

// Add Collections
var success = false;
testData.forEach(({collection: collectionName,databaseDTOs})=>{
  print(`Attempting to add collection "${collectionName}" to ${process.env.ARANGO_DB_NAME}`);
  if (db._create(collectionName)) {
    print('Created Collection');
    success = true;
  }
  else {
    success = false;
  }

  if (process.env.SETUP_MODE == "development") {
    print(`MODE=development: Load test data`);
    print(success);
    if (success) {
      print(`Attempting to add test data for collection ${collectionName}`)
      databaseDTOs.forEach(dto => db._collection(collectionName).save(dto))
    }
  }
})

print('\nCollections Loaded:\n')
var collectionsList = db._collections();

collectionsList.forEach(col => {
  if (col.name().indexOf('_') != 0) {
    print(col.name());
    const loadedData = db._query(`FOR d IN ${col.name()} RETURN d`);
    for (const result of loadedData) {
      print(result);
    }
  }
});
