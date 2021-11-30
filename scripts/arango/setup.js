const users = require('@arangodb/users');

users.save('testarango', 'PssWd88');

db._createDatabase("movies");
users.grantDatabase('testarango', 'movies', 'rw');

db._useDatabase("movies");

var actors = db._create("actors");
var movies = db._create("movies");
var actsIn = db._createEdgeCollection("actsIn");
