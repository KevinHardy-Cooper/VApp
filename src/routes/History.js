/*
    MOD-009
 */

// Imports
const Score = require('./Score');
const Levels = require('./Levels');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;

class History extends Score {
    static delegate() {
        // controls the flow of retrieving past scores
    }

    static getScores(userId, callback) {
        Score.getScores(userId, function(err, obj) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully got scores given userId in History");
            callback(null, obj);
        })
    }

    static getUsersScoresGivenSocialMedia(userId, socialMedia, callback) {
        Score.getScoreType(socialMedia, function(err, obj) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            let typeId = obj[0].id;
            Score.getScoresForGivenType(userId, typeId, function(err, obj) {
                if (err) {
                    logger.error(inspect(err));
                    throw err;
                }
                logger.info("Successfully got scores given userId and socialMedia in History");
                callback(null, obj);
            });
        });
    }

    static getUsersLevelGivenSocialMedia(userId, socialMedia, callback) {
        Score.getScoreType(socialMedia, function(err, obj) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            let typeId = obj[0].id;
            Score.getMostRecentScoreForGivenType(userId, typeId, function(err, obj) {
                if (err) {
                    logger.error(inspect(err));
                    throw err;
                }
                let amount = obj[0].score;
                logger.info("Successfully got most recent score given userId and socialMedia in History");
                Levels.getLevel(amount, function(err, obj) {
                    if (err) {
                        logger.error(inspect(err));
                        throw err;
                    }
                    logger.info("Successfully got level given score in History");
                    callback(null, obj);
                });
            });
        });
    }
}

module.exports = History;