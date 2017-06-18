let JWT = require('jsonwebtoken');
let config = require('../config.js');
let User = require('../models/user.js');
let hapiAuthJWT = require('hapi-auth-jwt2');

module.exports = {
    //TODO: add if for checking the env or find a more programtic way to handle this
    assignToken (request, user, callback) {
        let token = JWT.sign(user, config.auth.dev.secret);
        console.log(token);
        
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

    validateToken (decoded, request, callback) {
        const token = request.headers.token;
        User.findOne({ email: decoded.email }, function (err, user) {
            if (err) return callback(err);

            if (user.token.value == '' || user.token.expiresAt == null) {
                return callback(null, false);
            }

            if (user.token.expiresAt > Date.now) {
                return callback(null, true);
            } else {
                user.token.value = '';
                user.expiresAt = null;
                user.save(function (err) {
                    return callback(null, false);
                });
            }
        });
    }
};