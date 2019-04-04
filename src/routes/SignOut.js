/*
    MOD-005
 */

// Imports
const User = require("./User");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class SignOut extends User {
	static delegate(session_id, callback) {
		User.getUserBySessionId(session_id, function(error, result) {
			if (error) {
				logger.error(inspect(error));
				callback(error, null);
			} else if (result.code === 200) {
				let userId = result.userId;
				User.nullifySessionIdByUserId(userId, function (error, result) {
					if (error) {
						logger.error(inspect(error));
						callback(error, null);
					} else if (result.code === 200) {
						let response = {
							"code": 200,
							"message": "Sign out operation completed"
						};
						logger.info(response);
						callback(null, response);
					} else if (result.code === 204) {
						let response = {
							"code": 204,
							"message": "User does not exist for given userId in SignOut"
						};
						logger.info(response);
						callback(null, response);
					}
				});
			} else if (result.code === 204) {
				let response = {
					"code": 204,
					"message": "User does not exist for sessionId in SignOut"
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}
}

module.exports = SignOut;