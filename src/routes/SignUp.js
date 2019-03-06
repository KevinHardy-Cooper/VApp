/*
    MOD-003
 */

// Imports
const User = require('./User');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;
const crypto = require('crypto');
const sensitiveInfo = require('../../config/SensitiveInfo.json');

class SignUp extends User {
    static delegate(email, password, callback) {
        User.getUserByEmail(email, function(err, obj) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            } else if (obj.statusCode === 204) { // if the user does not exist for email

                // hash user password using AES
                let cipher = crypto.createCipher('aes-256-cbc', sensitiveInfo.aes_key);
                let encrypted_password = cipher.update(password,'utf8','hex');
                encrypted_password += cipher.final('hex');

                User.insertUser(email, encrypted_password, function(err, obj) {
                    if (err) {
                        logger.error(inspect(err));
                        throw err;
                    }
                    callback(null, obj);
                });
            } else if (obj.statusCode === 200) { // if the user does exist for email
                obj = {
                    "code": 204,
                    "failed": "New user not inserted, user already exists for email"
                };
                callback(null, obj);
            }
        });
    }
}

module.exports = SignUp;