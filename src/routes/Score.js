/*
    MOD-010
 */

// Imports
const DatabaseConnection = require("../../config/DatabaseConnection");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class Score {
	static insertScore(userId, typeId, score, callback) {
		let inserts = [userId, typeId, score];
		let con = DatabaseConnection.createConnection();
		let sql = "INSERT INTO Scores (user_id, type_id, score) " +
                    "VALUES (?, ?, ?)";
		con.query(sql, inserts, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			result.statusCode = 200;
			result.statusMessage = "New score inserted";
			callback(null, result);
		});
	}

	static getMostRecentScoresGivenUserId(userId, callback) {
		let inserts = [userId];
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT t1.* " +
			" FROM Scores t1" +
			" WHERE t1.time =" +
			" (SELECT MAX(t2.time) from Scores t2 WHERE t2.type_id = t1.type_id and user_id = ? group by type_id)";
		con.query(sql, inserts, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			callback(null, result);
		});
	}

	static getMostRecentScoreByUserIdAndScoreType(userId, typeId, callback) {
		let inserts = [userId, typeId];
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT * " +
                    "FROM Scores " +
                    "WHERE user_id = ?" +
                    " AND type_id = ?";
		con.query(sql, inserts, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			callback(null, result);
		});
	}

	static getScoresByUserId(userId, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT * " +
                    "FROM Scores " +
                    "WHERE user_id = ?";
		con.query(sql, userId, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			callback(null, result);
		});
	}

	static getScoreTypeBySocialMedia(socialMedia, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT id " +
                    "FROM Score_Types " +
                    "WHERE name = ?";
		con.query(sql, socialMedia, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			callback(null, result);
		});
	}
	
	// Only used in testing
	static deleteScore(userId, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "DELETE FROM Scores " +
			"WHERE user_id = ?";
		let inserts = [userId];
		con.query(sql, inserts, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else {
				callback(null, 200);
			}
		});
	}
}

module.exports = Score;