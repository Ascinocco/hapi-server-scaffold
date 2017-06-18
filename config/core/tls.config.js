let fs   = require('fs');
let path = require('path');

module.exports = {
    key: fs.readFileSync(path.join(__dirname, '/certs') + '/server.key', 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, '/certs') + '/server.crt', 'utf8')
}