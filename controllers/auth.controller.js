let authMiddleware = require('../middleware/auth.middleware.js');
let User = require('../models/user.js');

module.exports = {
    signUp (request, reply) {
        let respone = {
            messsage: "You've reached the sign up route"
        };

        reply(respone);
    },

    signIn (request, reply) {
        let user = {
            email: 'anthony@mail.com'
        };

        User.findOne({ email: user.email }, function (err, user) {
            if (err) throw err;

            user.comparePassword('password123!', function (err, isMatch) {
                if (err) throw err;

                if (isMatch) {
                    authMiddleware.assignToken(user, function (err, user) {
                        if (err) throw err;
                        
                        let response = {
                            messsage: "You've reached the sign in route",
                            user: user,
                            err: err
                        };

                        reply(response);
                    });
                } else {
                    let response = {
                        message: "Invalid Credentials"
                    }

                    reply(response);
                }
            });
        });
        
        
    },

    signOut (request, reply) {
        authMiddleware.revokeToken(request, function (err, success) {
            if (err) throw err;

            if (success) {
                let response = {
                    message: "You have been signed out!",
                    success: true
                };

                reply(response);
            }
        });
    }
};