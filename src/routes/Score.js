/*
    MOD-010
 */

// Imports
const DatabaseConnection = require('../../config/DatabaseConnection');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;

class Score {
    static insertScore(userId, typeId, score, callback) {
        let inserts = [userId, typeId, score];
        let con = DatabaseConnection.createConnection();
        let sql = 'INSERT INTO Scores (user_id, type_id, score) ' +
                    'VALUES (?, ?, ?)';
        con.query(sql, inserts, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully inserted score in Score");
            callback(null, 200);
        });
    }

    static getMostRecentScoreForGivenType(userId, typeId, callback) {
        let inserts = [userId, typeId];
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT *' +
            'FROM Scores ' +
            'WHERE user_id = ?' +
            ' AND type_id = ?' +
            ' ORDER BY id DESC LIMIT 1';
        con.query(sql, inserts, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully got scores for given type in Score");
            callback(null, result);
        });
    }

    static getScoresForGivenType(userId, typeId, callback) {
        let inserts = [userId, typeId];
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT * ' +
                    'FROM Scores ' +
                    'WHERE user_id = ?' +
                    ' AND type_id = ?';
        con.query(sql, inserts, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully got scores for given type in Score");
            callback(null, result);
        });
    }

    static getScoresByUserId(userId, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT * ' +
                    'FROM Scores ' +
                    'WHERE user_id = ?';
        con.query(sql, userId, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully got scores by userId in Score");
            callback(null, result);
        });
    }

    static getScoreType(socialMedia, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT id ' +
                    'FROM Score_Types ' +
                    'WHERE name = ?';
        con.query(sql, socialMedia, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully got score type by social media in Score");
            callback(null, result);
        });
    }
}

module.exports = Score;