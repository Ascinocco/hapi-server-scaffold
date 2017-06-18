let authMiddleware = require('../../middleware/auth.middleware.js');
let Models = require('../../models/models.js');

module.exports = {
    signUp (request, reply) {
        let respone = {
            messsage: "You've reached the sign up route"
        };

        return reply(respone);
    },

    signIn (request, reply) {
        let user = request.payload;

        Models.User.findOne({ email: user.email }, function (err, user) {
            if (err) {
                return reply({
                    message: "We could not find you",
                    success: false
                });
            }

            user.comparePassword('password123!', function (err, isMatch) {
                if (err) {
                    return reply({
                        message: "We had an error while trying to validate your password",
                        success: false
                    })
                }

                if (isMatch) {
                    authMiddleware.assignToken(user, function (err, user) {
                        if (err) {
                            return reply({
                                message: "We had an error while trying to log you in",
                                success: false
                            });
                        }

                        return reply({
                            message: "Welcome Back!",
                            success: true,
                            user: user
                        }).header('authorization', user.token.value);
                    });
                } else {
                    return reply({
                        message: "Incorrect Password",
                        success: false
                    });
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