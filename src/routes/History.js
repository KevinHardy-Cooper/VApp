/*
    MOD-009
 */

// Imports
const Score = require('./Score');

class History extends Score {
    static delegate() {
        // controls the flow of retrieving past scores
    }

    static getScores(userId, callback) {
        Score.getScores(userId, function(err, obj) {
            if (err) throw err;
            callback(null, obj);
        })
    }

    static getUsersScoresGivenSocialMedia(userId, socialMedia, callback) {
        Score.getScoreType(socialMedia, function(err, obj) {
            if (err) throw err;
            let typeId = obj[0].id;
            Score.getScoresForGivenType(userId, typeId, function(err, obj) {
                if (err) throw err;
                callback(null, obj);
            });
        });
    }
}

module.exports = History;