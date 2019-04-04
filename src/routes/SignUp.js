/*
    MOD-003
 */

// Imports
const User = require("./User");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;
const crypto = require("crypto");
const sensitiveInfo = require("../../config/SensitiveInfo.json");

class SignUp extends User {
	static delegate(email, password, callback) {
		User.getUserByEmail(email, function(error, result) {
			if (error) {
				logger.error(inspect(error));
				callback(error, null);
			} else if (result.code === 204) { // if the user does not exist for email

				// hash user password using AES
				let cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_key);
				let encrypted_password = cipher.update(password,"utf8","hex");
				encrypted_password += cipher.final("hex");

				User.insertUser(email, encrypted_password, function(error, result) {
					if (error) {
						logger.error(inspect(error));
						callback(error, null);
					} else if (result.code === 200) {
						let response = {
							"code": 200,
							"message": "Successful Sign Up Operation"
						};
						logger.info(response);
						callback(null, response);
					}
				});
			} else if (result.code === 200) { // if the user does exist for email
				let response = {
					"code": 204,
					"message": "Conflict - This email is already in use"
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}
}

module.exports = SignUp;