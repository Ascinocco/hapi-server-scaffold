let UserController = require('../../controllers/core/user.controller.js');

module.exports = [
    {
        method: 'GET',
        path: '/create-user',
        config: { auth: false },
        handler: UserController.index
    },

    {
        method: 'GET',
        path: '/pw-compare',
        config: { auth: 'jwt' },
        handler: UserController.pwCompare
    }
];