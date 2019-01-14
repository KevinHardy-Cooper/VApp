/*
    MOD-010
 */

// Imports
const DatabaseConnection = require('../../config/DatabaseConnection');

class Score {
    static insertScore(userId, typeId, score, callback) {
        let con = DatabaseConnection.createConnection();
        con.query("INSERT INTO Scores (user_id, type_id, score) VALUES ('" + userId + "', '" + typeId + "', '" + score + "')", function (err, result) {
            if (err) throw err;
            callback(null, 200);
        });
    }

    static getMostRecentScoreForGivenType() {
        // returns most recent score
    }

    static getScoresForGivenType(userId, typeId, callback) {
        let con = DatabaseConnection.createConnection();
        // TODO: add security
        con.query("SELECT * FROM Scores WHERE user_id =  '" + userId + "' AND type_id = '" + typeId + "'", function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    }

    static getScores(userId, callback) {
        let con = DatabaseConnection.createConnection();
        // TODO: add security
        con.query("SELECT * FROM Scores WHERE user_id =  '" + userId + "'", function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    }

    static getMostRecentScores() {
        // returns most recent scores for given user
    }

    static getScoreType(socialMedia, callback) {
        let con = DatabaseConnection.createConnection();
        // TODO: add security
        con.query("SELECT id FROM Score_Types WHERE name =  '" + socialMedia + "'", function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    }
}

module.exports = Score;