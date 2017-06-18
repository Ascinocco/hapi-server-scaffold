let env = process.env.NODE_ENV || 'dev';
const config = require('./config/config.js');

// basic configuration
let secret = '';
let mongoURL = '';
let serverConfig = {};

if (env === 'dev') {
    mongoURL = config.db.dev.url + config.db.dev.port + config.db.dev.store;
    serverConfig = {
        http: config.server.dev.http,
        https: config.server.dev.https
    };

    secret = config.auth.dev;
} else if (env === 'prod') {
    mongoURL = config.db.prod.url + config.db.prod.port + config.db.prod.store;
    serverConfig = {
        http: config.server.prod.http,
        https: config.server.prod.https
    };

    secret = config.auth.prod;
}

module.exports = {
    mongoURL: mongoURL,
    server: serverConfig,
    secret: secret
};