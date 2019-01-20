/*
    MOD-003
 */

// Imports
const User = require('./User');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;

class SignUp extends User {
    static delegate(email, password, callback) {
        User.getUserByEmail(email, function(err, obj) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            } else if (obj.statusCode === 204) { // if the user does not exist for email
                User.insertUser(email, password, function(err, obj) {
                    if (err) {
                        logger.error(inspect(err));
                        throw err;
                    }
                    callback(null, obj);
                });
            } else if (obj.statusCode === 200) { // if the user does exist for email
                obj.statusMessage = "New user not inserted, user already exists for email"
                callback(null, obj);
            }
        });
    }
}

module.exports = SignUp;