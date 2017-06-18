let moment = require('moment');
let JWT = require('jsonwebtoken');
let config = require('../config.js');
let env = process.env.NODE_ENV || 'dev';
let Models = require('../models/models.js');
let hapiAuthJWT = require('hapi-auth-jwt2');

module.exports = {
    //TODO: add if for checking the env or find a more programtic way to handle this
    assignToken (user, callback) {
        let secret = '';

        if (env == 'dev') {
            secret = config.auth.dev.secret;
        } else if (env == 'prod') {
            secret = config.auth.prod.secret;
        }

        if (user.token.expiresAt) {
            let expireTime = moment(user.token.expiresAt);

            if (expireTime.isBefore(moment())) {
                return callback(null, user.toJSON())
            }
        } else {
            let token = JWT.sign(user.toJSON(), secret);
            
            Models.User.findOneAndUpdate({ email: user.email},
            {
                $set: {
                    'token.value': token,
                    'token.expiresAt': moment()
                }
            },
            {
                new: true
            },
            function (err, user) {
                if (err) return callback(err);
                
                return callback(null, user.toJSON());
            });
        }
    },

    revokeToken (request, callback) {
        const token = request.headers.authorization;
        Models.User.findOneAndUpdate({ 'token.value': token }, {
            $set: {
                'token.value': '',
                'token.expiresAt': null
            }
        }, function (err) {
            if (err) return callback(err);

            return callback(null, true);
        });
    },

    validate (decoded, request, callback) {
        const token = request.headers.authorization;

        Models.User.findOne({ 'token.value': token }, function (err, user) {
            if (err) return callback(err);
            if (!user) return callback(null, false);

            if (user.token.value == '' || user.token.expiresAt == null) {
                return callback(null, false);
            }

            // convert stored time in db to moment time and compare
            let expireTime = moment(user.token.expiresAt);

            if (expireTime.isBefore(moment())) {
                return callback(null, true)
            } else {
                user.token.value = '';
                user.token.expiresAt = null;
                user.save(function (err) {
                    // return false regardless of error
                    // as we know the token is invalid at this point
                    return callback(err, false);
                });
            }
        });
    }
};