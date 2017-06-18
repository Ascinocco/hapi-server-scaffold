'use strict';

// imports
let mongoose = require('mongoose');
const config = require('./config.js');
let env = process.env.NODE_ENV || 'dev';

const authRoutes = require('./routes/core/auth.routes.js');
const userRoutes = require('./routes/core/user.routes.js');
const indexRoutes = require('./routes/core/index.routes.js');
let authMiddleware = require('./middleware/auth.middleware.js');

const Hapi = require('hapi');
const server = new Hapi.Server();

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

    serverConfig.https.tls = config.tls;
    secret = config.auth.dev;
} else if (env === 'prod') {
    mongoURL = config.db.prod.url + config.db.prod.port + config.db.prod.store;
    serverConfig = {
        http: config.server.prod.http,
        https: config.server.prod.https
    };

    serverConfig.https.tls = config.tls;
    secret = config.auth.prod;
}

// server config
server.connection(serverConfig.http); // http
server.connection(serverConfig.https) // https

// redirect all http to https
server.register({
    register: require('hapi-require-https'),
    options: {
        proxy: false
    }
});

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
console.log('MongoDB on:  \t' + mongoURL);

// start server
server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Hapi http on: \t' + 'http://' + serverConfig.http.host + ':' + serverConfig.http.port);
    console.log('Hapi https on: \t' + 'https://' + serverConfig.https.host + ':' + serverConfig.https.port);
});