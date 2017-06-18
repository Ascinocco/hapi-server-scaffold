let authMiddleware = require('../../middleware/auth.middleware.js');
let Models = require('../../models/models.js');

module.exports = {
    signUp(request, reply) {
        let accountInfo = request.payload;
        Models.User.findOne({
            email: accountInfo.email
        }, function (err, user) {
            if (err) {
                return reply({
                    message: "We experienced an error trying to create your account",
                    success: false,
                    err: err
                });
            }

            if (user) {
                return reply({
                    message: "The email you provided is already in use",
                    success: false
                });
            } else {
                let newUser = new Models.User(accountInfo);

                newUser.save(function (err) {
                    if (err) {
                        return reply({
                            message: "An error occured creating your account",
                            success: false,
                            err: err
                        });
                    }

                    authMiddleware.assignToken(newUser, function (err, user) {
                        if (err) {
                            return reply({
                                message: "You're account has been created, but an error occured logging you in",
                                success: false,
                                err: err
                            });
                        }

                        return reply({
                            message: "Welcome!",
                            success: true,
                            user: user
                        }).header('authorization', user.token.value);
                    });
                });
            }
        });
    },

    signIn(request, reply) {
        let credentials = request.payload;

        Models.User.findOne({
            email: credentials.email
        }, function (err, user) {
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

    signOut(request, reply) {
        authMiddleware.revokeToken(request, function (err, success) {
            if (err) {
                return reply({
                    message: "We had an error logging you out",
                    success: false
                });
            }

            if (success) {
                return reply({
                    message: "Goodbye :)",
                    success: true
                });
            } else {
                return reply({
                    message: "We messed up logging you out, sorry about that",
                    success: false
                });
            }
        });
    }
};