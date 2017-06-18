let UserController = require('../controllers/user.controller.js');

module.exports = [
    {
        method: 'GET',
        path: '/create-user',
        config: { auth: 'jwt' },
        handler: UserController.index
    },

    {
        method: 'GET',
        path: '/pw-compare',
        config: { auth: 'jwt' },
        handler: UserController.pwCompare
    }
];