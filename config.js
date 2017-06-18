let fs = require('fs');

module.exports = {
    server: {
        prod: {
            http: {
                port: 80,
                host: ''
            },

            https: {
                port: 443,
                host: ''
            }
        },

        dev: {
            http: {
                port: 3000,
                host: 'localhost'
            },

            https: {
                port: 3443,
                host: 'localhost'
            }
        }
    },

    db: {
        prod: {
            url: '',
            port: '',
            store: '',
            options: ''
        },

        dev: {
            url: 'mongodb://localhost',
            port: ':27017',
            store: '/hapiExample',
            options: ''
        }
    },

    auth: {
        prod: {
            secret: 'doNotSendThisSecretIntoProd'
        },

        dev: {
            secret: 'ChangeTheSecretBeforeUsingThisPls'
        }
    },

    tls: {
        key: fs.readFileSync('./certs/server.key'),
        cert: fs.readFileSync('./certs/server.crt')
    }
};