/*
    MOD-009
 */

// Imports
const Score = require('./Score');
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
}

module.exports = History;