module.exports = {
    auth:   require('./core/auth.config.js'),
    cors:   require('./core/cors.config.js'),
    db:     require('./core/db.config.js'),
    server: require('./core/server.config.js'),
    tls:    require('./core/tls.config.js')
};