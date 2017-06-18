let IndexController = require('../controllers/index.controller.js');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: IndexController.index
    }
];