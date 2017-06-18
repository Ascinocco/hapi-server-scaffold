let AuthController = require('../controllers/auth.controller.js');

module.exports = [
    {
        method: 'POST',
        path: '/sign-up',
        config: { auth: false },
        handler: AuthController.signUp
    },

    {
        method: 'POST',
        path: '/sign-in',
        config: { auth: false },
        handler: AuthController.signIn
    },

    {
        method: 'POST',
        path: '/sign-out',
        config: { auth: 'jwt' },
        handler: AuthController.signOut
    }
];