/*
    MOD-005
 */

// Imports
const User = require("./User");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class SignOut extends User {
	static delegate(session_id, callback) {
		User.getUserBySessionId(session_id, function(err, obj) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (obj.statusCode === 200) {
				User.nullifySessionId(obj[0].email, obj[0].password, function (err, obj) {
					if (err) {
						logger.error(inspect(err));
						throw err;
					}
					logger.info("Successfully signed out in SignOut");
					callback(null, 200);
				});
			}
		});
	}
}

module.exports = SignOut;