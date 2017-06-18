'use strict';

// imports
let mongoose = require('mongoose');

const config = require('./config.js');
const authRoutes = require('./routes/auth.routes.js');
const indexRoutes = require('./routes/index.routes.js');

const Hapi = require('hapi');
const server = new Hapi.Server();

// server config
server.connection(config.server);
server.route(indexRoutes);
server.route(authRoutes);

// database config
let env = process.env.NODE_ENV || 'dev';
let mongoURL = '';

if (env === 'dev') {
    mongoURL = config.db.dev.url + config.db.dev.port + config.db.dev.store;
} else if (env === 'prod') {
    mongoURL = config.db.prod.url + config.db.prod.port + config.db.prod.store;
}

mongoose.connect(mongoURL);
console.log(mongoURL);

// start server
server.start((err) => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
});