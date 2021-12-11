

print(">> Running Setup in Arangosh");

const users = require('@arangodb/users');

users.save(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_USER_PASSWORD);

db._createDatabase(process.env.ARANGO_DB_NAME);
users.grantDatabase(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_NAME, 'rw');

db._useDatabase(process.env.ARANGO_DB_NAME);

// TODO load this from separate file and link with app's list of db references
require("internal").load(process.env.ARANGO_DOCKER_VOLUME_SCRIPTS_DIR + "/data/testData.js");
// Add seed data below...
testData.forEach(({collection: collectionName,databaseDTOs})=>{
  print(`Attempting to add collection "${collectionName}" to ${process.env.ARANGO_DB_NAME}`);
  if (db._create(collectionName)) {
    print('Created Collection');
  }
  print(`Attempting to add data for collection ${collectionName}`)
  print(`Adding data for collection ${collectionName}`)
  databaseDTOs.forEach(dto => db._collection(collectionName).save(dto))
})

print('\nCollections Loaded:\n')
var collectionsList = db._collections();

collectionsList.forEach(col => {
  // print(col.name());
  if (col.name().indexOf('_') != 0) {
    print(col.name());
  }
});
