'use strict';

const config = require('./config.js');
const authRoutes = require('./routes/auth.routes.js');
const indexRoutes = require('./routes/index.routes.js');

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection(config.server);
server.route(indexRoutes);
server.route(authRoutes);

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
});