const { Pool, Client }  = require('pg');
const configuration = require( __dirname + '/config.js');
// Postgresql connection.
const client  = new Client( configuration.dbConfig );
client.connect();

module.exports = client;