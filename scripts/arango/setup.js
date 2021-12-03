print(">> Running Setup in Arangosh");

const users = require('@arangodb/users');

users.save(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_USER_PASSWORD);

db._createDatabase(process.env.ARANGO_DB_NAME);
users.grantDatabase(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_NAME, 'rw');

db._useDatabase(process.env.ARANGO_DB_NAME);

var termCollection = db._create("TermCollection");
var vocabularyListCollection = db._create("VocabularyListCollection");

print('\nCollections Loaded:\n')
var collectionsList = db._collections();

collectionsList.forEach(col => {
  // print(col.name());
  if (col.name().indexOf('_') != 0) {
    print(col.name());
  }
});

// Add seed data below...
