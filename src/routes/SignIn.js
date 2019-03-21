/*
    MOD-004
 */

// Imports
const User = require("./User");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;
const crypto = require("crypto");
const sensitiveInfo = require("../../config/SensitiveInfo.json");

class SignIn extends User {
	static delegate(email, password, callback) {

		// hash user password using AES
		let cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_key);
		let encrypted_password = cipher.update(password,"utf8","hex");
		encrypted_password += cipher.final("hex");

		User.getUser(email, encrypted_password, function(err, obj) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (obj.statusCode === 200) {
				let session_id = crypto.randomBytes(20).toString("hex");
				User.setSessionId(email, encrypted_password, session_id, function(err, obj) {
					if (err) {
						logger.error(inspect(err));
						callback(err, null);
					}
					let response = {
						"code" : obj.statusCode,
						"success" : "User exists for given email and password",
						"cookie": obj.statusMessage
					};
					callback(null, response);
				});
			} else {
				callback(null, obj);
			}
		});
	}
}

module.exports = SignIn;