/*
    MOD-004
 */

// Imports
const User = require('./User');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;
const crypto = require('crypto');
const sensitiveInfo = require('../../config/SensitiveInfo.json');

class SignIn extends User {
    static delegate(email, password, callback) {

        // hash user password using AES
        let cipher = crypto.createCipher('aes-256-cbc', sensitiveInfo.aes_key);
        let encrypted_password = cipher.update(password,'utf8','hex');
        encrypted_password += cipher.final('hex');

        User.getUser(email, encrypted_password, function(err, obj) {
            if (err) {
                logger.error(inspect(err));
                callback(err, null);
            }
            callback(null, obj);
        });
    }
}

module.exports = SignIn;