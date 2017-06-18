let IndexController = require('../../controllers/core/index.controller.js');

module.exports = [
    {
        method: 'GET',
        path: '/',
        config: { auth: false },
        handler: IndexController.index
    }
];