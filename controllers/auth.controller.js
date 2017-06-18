let authMiddleware = require('../middleware/auth.middleware.js');

module.exports = {
    signUp (request, reply) {
        let respone = {
            msg: "You've reached the sign up route"
        };

        reply(respone);
    },

    signIn (request, reply) {
        let user = {
            email: 'anthony@mail.com'
        };
        
        authMiddleware.assignToken(request, user, function (err, user) {
            let respone = {
                msg: "You've reached the sign in route",
                token: user,
                err: err
            };

            // console.log(user);

            reply(respone);
        });
    }
};