'use strict';

// imports
let mongoose = require('mongoose');
let config = require('./config/bootstrap.js');
let routes = require('./routes/routes.js');
let authMiddleware = require('./middleware/auth.middleware.js');

const Hapi = require('hapi');
const server = new Hapi.Server(config.hapi);

// server config
server.connection(config.server.http); // http
server.connection(config.server.https) // https

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
        key: config.secret,
        verifyFunc: authMiddleware.validate,
        verifyOptions: { algorithms: [ 'HS256' ] }
    };

    server.auth.strategy('jwt', 'jwt', options);
    server.auth.default('jwt');

    // loads all routes
    for (let i = 0; i < routes.length; i++) {
        server.route(routes[i]);
    }
});

mongoose.connect(config.mongoURL);
console.log('MongoDB on:  \t' + config.mongoURL);

// start server
server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Hapi http on: \t' + 'http://' + config.server.http.host + ':' + config.server.http.port);
    console.log('Hapi https on: \t' + 'https://' + config.server.https.host + ':' + config.server.https.port);
});