/*
    MOD-009
 */

// Imports
const Score = require("./Score");
const User = require("./User");
const Grade = require("./Grade");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class History extends Score {
	static getScoresBySessionId(sessionId, callback) {
		User.getUserBySessionId(sessionId, function(err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (result.code === 200) {
				let userId = result.userId;
				Score.getScoresByUserId(userId, function(err, result) {
					if (err) {
						logger.error(inspect(err));
						callback(err, null);
					} else if (result.code === 200) {
						let response = {
							"code": 200,
							"message": "All user's scores have been retrieved",
							"scores": result.scores
						};
						logger.info(response);
						callback(null, response);
					}
				});
			} else if (result.code === 204) {
				let response = {
					"code": 204,
					"message": "User does not exist for sessionId in History",
					"scores": result
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}

	static getMostRecentScoresBySessionId(sessionId, callback) {
		User.getUserBySessionId(sessionId, function(err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (result.code === 200) {
				let userId = result.userId;
				Score.getMostRecentScoresGivenUserId(userId, function (err, result) {
					if (err) {
						logger.error(inspect(err));
						callback(err, null);
					} else if (result.code === 200) {
						let response = {
							"code": 200,
							"message": "All most recent users scores have been retrieved",
							"scores": result.scores
						};
						logger.info(response);
						callback(null, response);
					}
				});
			} else if (result.code === 204) {
				let response = {
					"code": 204,
					"message": "User does not exist for sessionId in History"
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}

	static getMostRecentGradeBySessionIdAndSocialMedia(sessionId, socialMedia, callback) {
		Score.getScoreTypeBySocialMedia(socialMedia, function(err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (result.code === 200) {
				let typeId = result.scoreType;
				User.getUserBySessionId(sessionId, function(err, result) {
					if (err) {
						logger.error(inspect(err));
						callback(err, null);
					} else if (result.code === 200) {
						let userId = result.userId;
						Score.getMostRecentScoreByUserIdAndScoreType(userId, typeId, function (err, result) {
							if (err) {
								logger.error(inspect(err));
								callback(err, null);
							} else if (result.code === 200) {
								let amount = result.score;
								Grade.getGrade(amount, function (err, result) {
									if (err) {
										logger.error(inspect(err));
										callback(err, null);
									} else if (result.code === 200) {
										let response = {
											"code": 200,
											"message": "Grade for most recent user score for a given social media was retrieved",
											"grade": result.grade,
											"score": result.score
										};
										logger.info(response);
										callback(null, response);
									} else if (result.code === 204) {
										let response = {
											"code": 204,
											"message": "Grade not returned for amount in History"
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
							"message": "User does not exist for sessionId in History"
						};
						logger.info(response);
						callback(null, response);
					}
				});
			} else if (result.code === 204) {
				let response = {
					"code": 204,
					"message": "Score type not returned for social media in History"
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}
}

module.exports = History;