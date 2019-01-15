/*
    MOD-010
 */

// Imports
const DatabaseConnection = require('../../config/DatabaseConnection');

class Score {
    static insertScore(userId, typeId, score, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'INSERT INTO Scores (user_id, type_id, score) ' +
                    'VALUES (' + con.escape(userId) + ', ' + con.escape(typeId) + ', ' + con.escape(score) + ')';
        con.query(sql, function (err, result) {
            if (err) throw err;
            callback(null, 200);
        });
    }

    static getMostRecentScoreForGivenType() {
        // returns most recent score
    }

    static getScoresForGivenType(userId, typeId, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT * ' +
                    'FROM Scores ' +
                    'WHERE user_id = ' + con.escape(userId) +
                    ' AND type_id = ' + con.escape(typeId);
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, result);
        });
    }

    static getScores(userId, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT * ' +
                    'FROM Scores ' +
                    'WHERE user_id = ' + con.escape(userId);
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, result);
        });
    }

    static getMostRecentScores() {
        // returns most recent scores for given user
    }

    static getScoreType(socialMedia, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT id ' +
                    'FROM Score_Types ' +
                    'WHERE name = ' + con.escape(socialMedia);
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, result);
        });
    }
}

module.exports = Score;