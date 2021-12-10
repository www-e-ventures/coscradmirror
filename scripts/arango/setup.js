

print(">> Running Setup in Arangosh");

const users = require('@arangodb/users');

users.save(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_USER_PASSWORD);

db._createDatabase(process.env.ARANGO_DB_NAME);
users.grantDatabase(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_NAME, 'rw');

db._useDatabase(process.env.ARANGO_DB_NAME);

// TODO load this from separate file and link with app's list of db references
const collections = ['terms','vocabulary_lists'];

collections.forEach(collectionName => db._create(collectionName))

print('\nCollections Loaded:\n')
var collectionsList = db._collections();

collectionsList.forEach(col => {
  // print(col.name());
  if (col.name().indexOf('_') != 0) {
    print(col.name());
  }
});

//
// // Add seed data below...
// testData.forEach(({collection: collectionName,databaseDTOs})=>{
//   print(`Attempting to add data for collection ${collectionName}`)
//   if(!collections.includes(collectionName)) return;
//   print(`Adding data for collection ${collectionName}`)
//
//   databaseDTOs.forEach(dto => db._collection(collectionName).save(dto))
// })
