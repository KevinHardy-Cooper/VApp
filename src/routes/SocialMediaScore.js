/*
    MOD-012
 */

// Imports
const Score = require('./Score');

class SocialMediaScore extends Score {
    static calculateSocialMediaScore(userId, socialMedia, score, callback) {
        // calculates score for given social media given settings and implications
        // once this calculation is done, perform the following queries
        Score.getScoreType(socialMedia, function(err, obj) {
            if (err) throw err;
            let typeId = obj[0].id;
            Score.insertScore(userId, typeId, score, function(err, obj) {
                if (err) throw err;
                callback(null, 200);
            });
        });
    }
}

module.exports = SocialMediaScore;