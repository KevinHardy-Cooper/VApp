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
		
		// hash user email using AES
		let email_cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_email_key);
		let encrypted_email = email_cipher.update(email,"utf8","hex");
		encrypted_email += email_cipher.final("hex");
		
		// hash user password using AES
		let password_cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_password_key);
		let encrypted_password = password_cipher.update(password,"utf8","hex");
		encrypted_password += password_cipher.final("hex");

		User.getUser(encrypted_email, encrypted_password, function(err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (result.code === 200) {
				let sessionId = crypto.randomBytes(20).toString("hex");
				let userId = result.userId;
				User.setSessionIdByUserId(userId, sessionId, function(err, result) {
					if (err) {
						logger.error(inspect(err));
						callback(err, null);
					} else if (result.code === 200) {
						let response = {
							"code": 200,
							"message": "Successful Sign In Operation",
							"sessionId": result.sessionId
						};
						logger.info(response);
						callback(null, response);
					} else if (result.code === 204) {
						let response = {
							"code": 204,
							"message": "SessionId was not updated for User in SignIn"
						};
						logger.info(response);
						callback(null, response);
					}
				});
			} else if (result.code === 204) {
				let response = {
					"code": 204,
					"message": "User does not exist for given email and password in SignIn"
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}
}

module.exports = SignIn;