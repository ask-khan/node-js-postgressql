const config = {};

// Database Configuration.
config.dbConfig = {};
config.dbConfig = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'node-js-server',
    password: 'admin',
    port: 5432
}

// Configuration Mode.
config.mode = {};
// Development Mode.
config.mode.DEVELOPMENT = 'development';
// Production Mode.
config.mode.PRODUCTION = 'production';

config.mode.CURRENT = {};
config.mode.CURRENT = config.mode.DEVELOPMENT;

config.mode.PORT = config.mode.CURRENT == config.mode.DEVELOPEMENT ? 3001 : 3000;

module.exports = config;


