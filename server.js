'use strict';

// imports
let mongoose = require('mongoose');
let env = process.env.NODE_ENV || 'dev';

const config = require('./config.js');
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');
const indexRoutes = require('./routes/index.routes.js');
let authMiddleware = require('./middleware/auth.middleware.js');

const Hapi = require('hapi');
const server = new Hapi.Server();

// basic configuration
let secret = '';
let mongoURL = '';
let serverConfig = {};

if (env === 'dev') {
    mongoURL = config.db.dev.url + config.db.dev.port + config.db.dev.store;
    serverConfig = config.server.dev;
    secret = config.auth.dev;
} else if (env === 'prod') {
    mongoURL = config.db.prod.url + config.db.prod.port + config.db.prod.store;
    serverConfig = config.server.prod;
    secret = config.auth.prod;
}

// server config
server.connection(serverConfig);
server.register(require('hapi-auth-jwt2'), function (err) {
    if (err) console.log(err);

    let options = {
        key: secret,
        verifyFunc: authMiddleware.validate,
        verifyOptions: { algorithms: [ 'HS256' ] }
    };

    server.auth.strategy('jwt', 'jwt', options);
    server.auth.default('jwt');

    server.route(authRoutes);
    server.route(userRoutes);
    server.route(indexRoutes);
});

mongoose.connect(mongoURL);
console.log(mongoURL);

// start server
server.start((err) => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
});