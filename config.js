module.exports = {
    server: {
        port: 3000,
        host: 'localhost'
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
    }
};