/*
    MOD-012
 */

// Imports
const Score = require('./Score');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;

class SocialMediaScore extends Score {
    static calculateSocialMediaScore(userId, socialMedia, score, callback) {
        // calculates score for given social media given settings and implications
        // once this calculation is done, perform the following queries
        Score.getScoreType(socialMedia, function(err, obj) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully got the score type in SocialMediaScore");
            let typeId = obj[0].id;
            Score.insertScore(userId, typeId, score, function(err, obj) {
                if (err) {
                    logger.error(inspect(err));
                    throw err;
                }
                logger.info("Successfully inserted score in SocialMediaScore");
                callback(null, 200);
            });
        });
    }
}

module.exports = SocialMediaScore;