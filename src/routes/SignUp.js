/*
    MOD-003
 */

// Imports
const User = require('./User');

class SignUp extends User {
    static delegate(email, password, callback) {
        User.insertUser(email, password, function(err, obj) {
            if (err) throw err;
            callback(null, 200);
        });
    }
}

module.exports = SignUp;