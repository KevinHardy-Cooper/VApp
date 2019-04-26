/*
    MOD-???
 */

// Imports
const User = require("./User");
const Score = require("./Score");
const logger = require("../../config/log.js");
const crypto = require("crypto");
const sensitiveInfo = require("../../config/SensitiveInfo.json");
const inspect = require("util").inspect;

class Account {
	static updateEmailBySessionId(sessionId, email, callback) {
		
		// hash user email using AES
		let cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_email_key);
		let encrypted_email = cipher.update(email,"utf8","hex");
		encrypted_email += cipher.final("hex");
		
		User.getUserByEmail(encrypted_email, function(error, result) {
			if (error) {
				logger.error(inspect(error));
				callback(error, null);
			} else if (result.code === 204) { // if the user does not exist for email
				User.getUserBySessionId(sessionId, function(err, result) {
					if (err) {
						logger.error(inspect(err));
						callback(err, null);
					} else if (result.code === 200) {
						let userId = result.userId;
						
						User.updateEmailByUserId(userId, encrypted_email, function(error, result) {
							if (error) {
								logger.error(inspect(error));
								callback(error, null);
							} else if (result.code === 200) {
								let response = {
									"code": 200,
									"message": "Successful Email Update"
								};
								logger.info(response);
								callback(null, response);
							}
						});
					} else if (result.code === 204) {
						let response = {
							"code": 204,
							"message": "User does not exist for sessionId in Account",
							"scores": result
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
	
	static updatePasswordBySessionId(sessionId, password, callback) {
		User.getUserBySessionId(sessionId, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (result.code === 200) {
				let userId = result.userId;
				
				// hash user email using AES
				let cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_password_key);
				let encrypted_password = cipher.update(password, "utf8", "hex");
				encrypted_password += cipher.final("hex");
				
				User.updatePasswordByUserId(userId, encrypted_password, function (error, result) {
					if (error) {
						logger.error(inspect(error));
						callback(error, null);
					} else if (result.code === 200) {
						let response = {
							"code": 200,
							"message": "Successful Password Update"
						};
						logger.info(response);
						callback(null, response);
					}
				});
			} else if (result.code === 204) {
				let response = {
					"code": 204,
					"message": "User does not exist for sessionId in Account",
					"scores": result
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}
	
	static deleteAccountBySessionId(sessionId, callback) {
		User.getUserBySessionId(sessionId, function (err, result) {
			User.getUserBySessionId(sessionId, function (err, result) {
				if (err) {
					logger.error(inspect(err));
					callback(err, null);
				} else if (result.code === 200) {
					let userId = result.userId;
					Score.deleteScoresByUserId(userId, function (error, result) {
						if (error) {
							logger.error(inspect(error));
							callback(error, null);
						} else if (result.code === 200) {
							User.deleteUserByUserId(userId, function (error, result) {
								if (error) {
									logger.error(inspect(error));
									callback(error, null);
								} else if (result.code === 200) {
									let response = {
										"code": 200,
										"message": "Successful User Deletion"
									};
									logger.info(response);
									callback(null, response);
								}
							});
						}
					});
				} else if (result.code === 204) {
					let response = {
						"code": 204,
						"message": "User does not exist for sessionId in Account",
						"scores": result
					};
					logger.info(response);
					callback(null, response);
				}
			});
		});
	}
}

module.exports = Account;