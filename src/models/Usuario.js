const Model = require('./Model');

function usuarios() {
    return new Model('usuarios');
}

module.exports = usuarios