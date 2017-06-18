let AuthController = require('../controllers/auth.controller.js');

module.exports = [
    {
        method: 'POST',
        path: '/sign-up',
        handler: AuthController.signUp
    },

    {
        method: 'POST',
        path: '/sign-in',
        handler: AuthController.signIn
    }
];