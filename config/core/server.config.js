let tls = require('./tls.config.js');

module.exports = {
    prod: {
        http: {
            port: 80,
            host: '' // should pull from env variables
        },

        https: {
            port: 443,
            host: '', // should pull from env variables
            tls: tls
        }
    },

    dev: {
        http: {
            port: 3000,
            host: 'localhost'
        },

        https: {
            port: 3443,
            host: 'localhost',
            tls: tls
        }
    }
};