module.exports = {
    signUp (request, reply) {
        let respone = {
            msg: "You've reached the sign up route"
        };

        reply(respone);
    },

    signIn (request, reply) {
        let respone = {
            msg: "You've reached the sign in route"
        };

        reply(respone);
    }
};