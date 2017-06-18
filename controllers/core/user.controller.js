let Models = require('../../models/models.js');

module.exports = {
    // get all users
    index (request, reply) {
        Models.User.find({}, function (err , users) {
            if (err) {
                return reply({
                    message: "An error occured retrieving all users",
                    success: false
                });
            }

            let userObjs = [];
            // remove token from results
            for (let i = 0; i < users.length; i++) {
                userObjs.push(users[i].toObject());
            }

            let cleanedUsers = [];
            for (let x = 0; x < userObjs.length; x++) {
                delete userObjs[x]['password'];
                delete userObjs[x]['token'];
                cleanedUsers.push(userObjs[x]);
            }

            return reply({
                users: cleanedUsers,
                success: true
            });
        });
    },

    // save new user
    store (request, reply) {

    },

    // show specific user
    show (request, reply) {

    },

    // update specific user
    update (request, reply) {

    },

    // destroy specific user
    destroy (request, reply) {

    }
};