const users = require('@arangodb/users');

  users.save('devtester', process.env.ARANGO_DB_USER_PASSWORD);

db._createDatabase("coscrad");
users.grantDatabase('devtester', 'coscrad', 'rw');

db._useDatabase("coscrad");

var termCollection = db._create("TermCollection");
var vocabularyListCollection = db._create("VocabularyListCollection");

// Add seed data below...
