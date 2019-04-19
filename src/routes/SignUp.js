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
		
		// hash user email using AES
		let email_cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_email_key);
		let encrypted_email = email_cipher.update(email,"utf8","hex");
		encrypted_email += email_cipher.final("hex");
		
		User.getUserByEmail(encrypted_email, function(error, result) {
			if (error) {
				logger.error(inspect(error));
				callback(error, null);
			} else if (result.code === 204) { // if the user does not exist for email

				// hash user password using AES
				let password_cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_password_key);
				let encrypted_password = password_cipher.update(password,"utf8","hex");
				encrypted_password += password_cipher.final("hex");

				User.insertUser(encrypted_email, encrypted_password, function(error, result) {
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