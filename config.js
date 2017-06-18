module.exports = {
    server: {
        prod: {
            port: 80,
            host: ''
        },

        dev: {
            port: 3000,
            host: 'localhost'
        }
    },

    db: {
        prod: {
            url: '',
            port: '',
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
            secret: ''
        },

        dev: {
            secret: 'ChangeTheSecretBeforeUsingThisPls'
        }
    }
};