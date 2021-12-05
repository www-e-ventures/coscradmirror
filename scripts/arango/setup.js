// TODO load this from JSON
const testData = [
  {
    "collection": "terms",
    "databaseDTOs": [
      {
        "term": "Chil-term-1",
        "termEnglish": "Engl-term-1",
        "contributorId": "John Doe",
        "_key": "1"
      },
      {
        "term": "Chil-term-2",
        "termEnglish": "Engl-term-2",
        "contributorId": "John Doe",
        "_key": "2"
      },
      {
        "term": "Chil-term-no-english",
        "contributorId": "Jane Deer",
        "_key": "3"
      }
    ]
  },
  {
    "collection": "vocabulary_lists",
    "databaseDTOs": [
      {
        "name": "test VL 1 chil",
        "nameEnglish": "test VL 1 engl",
        "entries": [
          {
            "termId": "1",
            "variableValues": {
              "person": "11"
            }
          },
          {
            "termId": "2",
            "variableValues": {
              "person": "21"
            }
          }
        ],
        "variables": [
          {
            "name": "person",
            "type": "dropbox",
            "validValues": [
              {
                "display": "I",
                "value": "11"
              },
              {
                "display": "We",
                "value": "21"
              }
            ]
          }
        ]
      },
      {
        "name": "test VL 2 CHIL- no engl name",
        "entries": [
          {
            "termId": "2",
            "variableValues": {
              "person": "23"
            }
          }
        ],
        "variables": []
      }
    ]
  }
]

print(">> Running Setup in Arangosh");

const users = require('@arangodb/users');

// TODO load this from separate file and link with app's list of db references
const collections = ['terms','vocabulary_lists']

users.save(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_USER_PASSWORD);

db._createDatabase(process.env.ARANGO_DB_NAME);
users.grantDatabase(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_NAME, 'rw');

db._useDatabase(process.env.ARANGO_DB_NAME);

collections.forEach(collectionName => db._create(collectionName))

print('\nCollections Loaded:\n')
var collectionsList = db._collections();

collectionsList.forEach(col => {
  // print(col.name());
  if (col.name().indexOf('_') != 0) {
    print(col.name());
  }
});

// Add seed data below...
testData.forEach(({collection: collectionName,databaseDTOs})=>{
  print(`Attempting to add data for collection ${collectionName}`)
  if(!collections.includes(collectionName)) return;
  print(`Adding data for collection ${collectionName}`)

  databaseDTOs.forEach(dto => db._collection(collectionName).save(dto))
})
