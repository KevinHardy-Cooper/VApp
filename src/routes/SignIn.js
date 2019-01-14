/*
    MOD-004
 */

// Imports
const User = require('./User');

class SignIn extends User {
    static delegate(email, password, callback) {
        User.getUser(email, password, function(err, obj) {
            if (err) throw err;
            callback(null, obj);
        });
    }
}

module.exports = SignIn;