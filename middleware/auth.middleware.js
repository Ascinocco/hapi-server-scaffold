let JWT = require('jsonwebtoken');
let config = require('../config.js');
let User = require('../models/user.js');
let hapiAuthJWT = require('hapi-auth-jwt2');
let env = process.env.NODE_ENV || 'dev';
module.exports = {
    //TODO: add if for checking the env or find a more programtic way to handle this
    assignToken (request, user, callback) {
        let secret = '';

        if (env == 'dev') {
            secret = config.auth.dev.secret;
        } else if (env == 'prod') {
            secret = config.auth.prod.secret;
        }

        let token = JWT.sign(user, secret);
        // console.log(token);
        
        User.findOneAndUpdate({ email: user.email},
        {
            $set: {
                'token.value': token,
                'token.expiresAt': Date.now()
            }
        },
        {
            new: true
        },
        function (err, user) {
            if (err) return callback(err);
            
            return callback(null, user);
        });
    },

    revokeToken (request, user, callback) {
        User.findOneAndUpdate({ email: user.email }, {
            $set: {
                'token.value': '',
                'token.expiresAt': null
            }
        }, function (err) {
            if (err) return callback(err);

            return callback(null, false);
        });
    },

    validate (decoded, request, callback) {
        const token = request.headers.authorization;
        console.log(token);
        User.findOne({ 'token.value': token }, function (err, user) {
            if (err) return callback(err);

            return callback(null, true);

            // if (user.token.value == '' || user.token.expiresAt == null) {
            //     return callback(null, false);
            // }

            // if (user.token.expiresAt > Date.now) {
            //     return callback(null, true);
            // } else {
            //     user.token.value = '';
            //     user.expiresAt = null;
            //     user.save(function (err) {
            //         return callback(null, false);
            //     });
            // }
        });
    }
};