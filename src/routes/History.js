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
					callback(null, obj);
				});
			} else {
				callback(null, obj);
			}
		});
	}

	static getMostRecentScoresBySessionId(sessionId, callback) {
		User.getUserBySessionId(sessionId, function(err, obj) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (obj.statusCode === 200) {
				let userId = obj[0].id;
				Score.getMostRecentScoresGivenUserId(userId, function (err, obj) {
					if (err) {
						logger.error(inspect(err));
						callback(err, null);
					}
					logger.info("Successfully got scores given userId and socialMedia in History");
					callback(null, obj);
				});
			} else {
				callback(null, obj);
			}
		});
	}

	static getMostRecentLevelBySessionIdAndSocialMedia(sessionId, socialMedia, callback) {
		Score.getScoreTypeBySocialMedia(socialMedia, function(err, obj) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (obj.length > 0) {
				let typeId = obj[0].id;
				User.getUserBySessionId(sessionId, function(err, obj) {
					if (err) {
						logger.error(inspect(err));
						callback(err, null);
					} else if (obj.statusCode === 200) {
						Score.getMostRecentScoreByUserIdAndScoreType(obj[0].id, typeId, function (err, obj) {
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
					} else {
						callback(null, obj);
					}
				});
			} else {
				callback(null, obj);
			}
		});
	}
}

module.exports = History;