let UserController = require('../../controllers/core/user.controller.js');

module.exports = [
    {
        method: 'GET', // get users
        path: '/api/users',
        config: { auth: 'jwt' },
        handler: UserController.index
    },

    {
        method: 'POST', // create user
        path: '/api/users',
        config: { auth: 'jwt' },
        handler: UserController.store
    },

    {
        method: 'GET', // get specific user
        path: '/api/users/{user_id}',
        config: { auth: 'jwt' },
        handler: UserController.show
    },

    {
        method: 'PUT', // update a specific user
        path: '/api/users/{user_id}',
        config: { auth: 'jwt' },
        handler: UserController.update
    },

    {
        method: 'DELETE', // delete a specific user
        path: '/api/users/{user_id}',
        config: { auth: 'jwt' },
        handler: UserController.destroy
    }
];