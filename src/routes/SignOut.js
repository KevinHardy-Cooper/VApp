/*
    MOD-005
 */

// Imports
const User = require('./User');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;

class SignOut extends User {
    static delegate(email, password, callback) {
        User.nullifySessionId(email, password, function (err, obj) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully signed out in SignOut");
            callback(null, 200);
        });
    }
}

module.exports = SignOut;