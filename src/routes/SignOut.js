/*
    MOD-005
 */

// Imports
const User = require('./User');

class SignOut extends User {
    static delegate(email, password, callback) {
        User.nullifySessionId(email, password, function (err, obj) {
            if (err) throw err;
            callback(null, 200);
        });
    }
}

module.exports = SignOut;