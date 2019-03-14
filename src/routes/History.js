/*
    MOD-009
 */

// Imports
const Score = require("./Score");
const User = require("./User");
const Levels = require("./Levels");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class History extends Score {
	static getScoresBySessionId(sessionId, callback) {
		User.getUserBySessionId(sessionId, function(err, obj) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (obj.statusCode === 200) {
				Score.getScoresByUserId(obj[0].id, function(err, obj) {
					if (err) {
						logger.error(inspect(err));
						callback(err, null);
					}
					logger.info("Successfully got scores given userId in History");
					callback(null, obj);
				});
			}
		})
	}

	static getScoresByUserIdAndSocialMedia(userId, socialMedia, callback) {
		Score.getScoreType(socialMedia, function(err, obj) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			let typeId = obj[0].id;
			Score.getScoresForGivenType(userId, typeId, function(err, obj) {
				if (err) {
					logger.error(inspect(err));
					callback(err, null);
				}
				logger.info("Successfully got scores given userId and socialMedia in History");
				callback(null, obj);
			});
		});
	}

	static getUsersLevelGivenSocialMedia(sessionId, socialMedia, callback) {
		Score.getScoreType(socialMedia, function(err, obj) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			let typeId = obj[0].id;
			User.getUserBySessionId(sessionId, function(err, obj) {
				if (err) {
					logger.error(inspect(err));
					callback(err, null);
				} else if (obj.statusCode === 200) {
					Score.getMostRecentScoreForGivenType(obj[0].id, typeId, function (err, obj) {
						if (err) {
							logger.error(inspect(err));
							callback(err, null);
						}
						let amount = obj[0].score;
						logger.info("Successfully got most recent score given userId and socialMedia in History");
						Levels.getLevel(amount, function (err, obj) {
							if (err) {
								logger.error(inspect(err));
								callback(err, null);
							}
							logger.info("Successfully got level given score in History");
							callback(null, obj);
						});
					});
				}
			});
		});
	}
}

module.exports = History;