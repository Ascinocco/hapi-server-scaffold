let User = require('../models/user.js');

module.exports = {
    index (request, reply) {
        let anthony = new User({
            name: 'Anthony Scinocco',
            email: 'anthony@mail.com',
            password: 'password123!'
        });

        anthony.save((err) => {
            if (err) throw err;

            reply(anthony);
        });
    },

    pwCompare (request, reply) {

        User.findOne({email: 'anthony@mail.com'}, (err, user) => {
            let pw = 'password1234!';
            user.comparePassword(pw, (err, isMatch) => {
                reply(isMatch);
            });
        });
    }
};