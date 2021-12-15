print(">> Running Setup in Arangosh");

const users = require('@arangodb/users');

users.save(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_USER_PASSWORD);

db._createDatabase(process.env.ARANGO_DB_NAME);
users.grantDatabase(process.env.ARANGO_DB_USER, process.env.ARANGO_DB_NAME, 'rw');

// Haida Stories DB - Temporary
db._createDatabase('haidastories');
users.grantDatabase('haida', 'haidastories', 'rw');

db._useDatabase(process.env.ARANGO_DB_NAME);

// TODO load this from separate file and link with app's list of db references
require("internal").load(process.env.ARANGO_DOCKER_VOLUME_SCRIPTS_DIR + "/test-data/testData.js");

// Add Collections
let collData = [];
let createdCollections = [];

dbCollections.forEach(collection => {
  print(`Attempting to add collection "${collection.collectionName}" to ${process.env.ARANGO_DB_NAME}`);
  if (db._create(collection.collectionName, {}, collection.type)) {
    print(`Created Collection of type ${collection.type}`);
    createdCollections.push(collection.collectionName);
  }
  else {
    print(`Collection "${collection.collectionName}" could not be created`);
  }
});

if (process.env.SETUP_MODE == "development") {
  print(`MODE=development: Load test data`);

  testData.forEach(({collection: collectionName,databaseDTOs})=>{
    if (!createdCollections.includes(collectionName)) return;
    print(`Attempting to add test data for collection ${collectionName}`)
    databaseDTOs.forEach(dto => db._collection(collectionName).save(dto))
  });

  let collData = [];
  print('Set up random edges');
  testEdgeConfig.forEach(edgeConfig => {
    let fromCollection = db._query(`
      FOR d IN ${edgeConfig.from_collection}
        RETURN d._id
    `).toArray();
    print('fromCollection:', fromCollection);
    let toCollection = db._query(`
      FOR d IN ${edgeConfig.to_collection}
        RETURN d._id
    `).toArray();
    print('toCollection:', toCollection);

    // Create edges
    fromCollection.forEach(fromId => {
      toCollection.forEach(toId => {
        const random = Math.round(Math.random());
        if (random == 1) {
          const query = `INSERT { _from: "${fromId}", _to: "${toId}" } INTO ${edgeConfig.edge_collection}`;
          print('query: ', query);
          db._query(query);
        }
        else {
          print(`No insert: random = ${random}`);
        }
      })
    })
  });

  const graph_module = require("@arangodb/general-graph");
  let edgeDefinitions = [];
  testEdgeConfig.forEach(edgeConfig => {
    const query = { collection: edgeConfig.edge_collection, "from": [ edgeConfig.from_collection ], "to" : [ edgeConfig.to_collection ] };
    // print(query);
    edgeDefinitions.push(query);
  });
  const graph = graph_module._create("terms_graph", edgeDefinitions);
}

print('\nCollections Loaded:\n')
var collectionsList = db._collections();

collectionsList.forEach(col => {
  if (col.name().indexOf('_') != 0) {
    print(col.name());
    const loadedData = db._query(`
      FOR d IN ${col.name()} RETURN d
    `);
    for (const result of loadedData) {
      print(result._id);
    }
  }
});
