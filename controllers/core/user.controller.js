let Models = require('../../models/models.js');

module.exports = {
    // get all users
    // TODO: restrict to admins only
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
    // TODO: restrict to admins only
    store (request, reply) {
        let accountInfo = request.payload;

        Models.User.findOne({ email: accountInfo.email }, function (err, user) {
            if (err) {
                return reply({
                    message: "We occured an error while trying to create the new user",
                    success: false
                });
            }

            if (user) {
                return reply({
                    message: "The email you entered is already in use",
                    success: false
                });
            } else {
                let newUser = new Models.User(accountInfo);

                newUser.save(function (err) {
                    if (err) {
                        return reply({
                            message: "An error occured creating the new account",
                            success: false
                        });
                    }

                    return reply({
                        message: "User Created",
                        success: true,
                        user: newUser.toJSON()
                    });
                });
            }
        });
    },

    // show specific user
    // TODO: only account owners and admins should be able to drill down into
    // specific account details
    show (request, reply) {
        let userId = request.params.user_id; // get user id from url

        Models.User.findOne({ _id: userId }, function(err, user) {
            if (err) {
                return reply({
                    message: "We occured an error while trying to find the user you asked for",
                    success: false
                });
            }

            if (!user) {
                return reply({
                    message: "We couldn't find the user you asked for",
                    success: false
                });
            } else {
                return reply({
                    message: "Found the user!",
                    success: true,
                    user: user.toJSON()
                });
            }
        });
    },

    // update specific user
    // TODO: only account owners and admins should be able to update an account
    // TODO: Updates not actually happening although input data appears to be correct
    update (request, reply) {
        let userId = request.params.user_id;
        let updates = request.payload;

        console.log(updates);

        Models.User.findOneAndUpdate({ _id: userId },
        { $set: { updates } }, 
        { new: true },
        function (err, user) {
            if (err) {
                return reply({
                    message: "An error occured looking for the account to update",
                    success: false
                });
            }

            if (!user) {
                return reply({
                    message: "We couldn't find the account you want to update",
                    success: false
                });
            } else {
                return reply({
                    message: "Account updated!",
                    success: true,
                    user: user.toJSON()
                });
            }
        });
    },

    // destroy specific user
    // TODO: only account owners and admins should be able to delete an account
    destroy (request, reply) {

    }
};