let UserController = require('../controllers/user.controller.js');

module.exports = [
    {
        method: 'GET',
        path: '/create-user',
        handler: UserController.index
    },

    {
        method: 'GET',
        path: '/pw-compare',
        handler: UserController.pwCompare
    }
];