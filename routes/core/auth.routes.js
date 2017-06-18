let AuthController = require('../../controllers/core/auth.controller.js');

module.exports = [
    {
        method: 'POST',
        path: '/api/sign-up',
        config: { auth: false },
        handler: AuthController.signUp
    },

    {
        method: 'POST',
        path: '/api/sign-in',
        config: { auth: false },
        handler: AuthController.signIn
    },

    {
        method: 'POST',
        path: '/api/sign-out',
        config: { auth: 'jwt' },
        handler: AuthController.signOut
    }
];