/*
    MOD-004
 */

// Imports
const User = require('./User');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;

class SignIn extends User {
    static delegate(email, password, callback) {
        User.getUser(email, password, function(err, obj) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            callback(null, obj);
        });
    }
}

module.exports = SignIn;