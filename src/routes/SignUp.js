/*
    MOD-003
 */

// Imports
const User = require('./User');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;

class SignUp extends User {
    static delegate(email, password, callback) {
        User.insertUser(email, password, function(err, obj) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully signed up in SignUp");
            callback(null, 200);
        });
    }
}

module.exports = SignUp;