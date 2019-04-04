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
			con.end();
			if (err) {
				logger.error(inspect(err));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				logger.info(response);
				callback(response, null);
			} else if (result.affectedRows === 1) {
				let response = {
					"code": 200,
					"message": "New score inserted"
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}

	static getMostRecentScoresGivenUserId(userId, callback) {
		let inserts = [userId];
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT t1.type_id, t1.score, t1.time " +
			" FROM Scores t1" +
			" WHERE t1.time =" +
			" (SELECT MAX(t2.time) from Scores t2 WHERE t2.type_id = t1.type_id and user_id = ? group by type_id)";
		con.query(sql, inserts, function (err, result) {
			con.end();
			if (err) {
				logger.error(inspect(err));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				logger.info(response);
				callback(response, null);
			} else {
				let response = {
					"code": 200,
					"message": "User's most recent scores have been retrieved",
					"scores": result
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}

	static getMostRecentScoreByUserIdAndScoreType(userId, typeId, callback) {
		let inserts = [userId, typeId];
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT score " +
                    "FROM Scores " +
                    "WHERE user_id = ?" +
                    " AND type_id = ?" +
					" ORDER BY id DESC LIMIT 1";
		con.query(sql, inserts, function (err, result) {
			con.end();
			if (err) {
				logger.error(inspect(err));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				logger.info(response);
				callback(response, null);
			} else if (result.length == 0) {
				let response = {
					"code": 204,
					"message": "Invalid userId or typeId"
				};
				callback(null, response);
			} else if (result.length === 1) {
				let response = {
					"code": 200,
					"message": "User's most recent score have been retrieved for given score type",
					"score": result[0].score
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}

	static getScoresByUserId(userId, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT type_id, score, time " +
                    "FROM Scores " +
                    "WHERE user_id = ?";
		con.query(sql, userId, function (err, result) {
			con.end();
			if (err) {
				logger.error(inspect(err));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				logger.info(response);
				callback(response, null);
			} else if (result.length === 0) {
				let response = {
					"code": 204,
					"message": "Invalid userId used to get scores"
				};
				callback(null, response);
			} else if (result.length > 0) {
				let response = {
					"code": 200,
					"message": "Scores returned for userId",
					"scores": result
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}

	static getScoreTypeBySocialMedia(socialMedia, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT id " +
                    "FROM Score_Types " +
                    "WHERE name = ?";
		con.query(sql, socialMedia, function (err, result) {
			con.end();
			if (err) {
				logger.error(inspect(err));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				logger.info(response);
				callback(response, null);
			} else if (result.length > 0) {
				let response = {
					"code": 200,
					"message": "Score type returned for social media",
					"scoreType": result[0].id
				};
				logger.info(response);
				callback(null, response);
			} else if (result.length === 0) {
				let response = {
					"code": 204,
					"message": "Score type not returned for social media"
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}
	
	// Only used in testing
	static deleteScore(userId, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "DELETE FROM Scores " +
			"WHERE user_id = ?";
		let inserts = [userId];
		con.query(sql, inserts, function (err, result) {
			con.end();
			if (err) {
				logger.error(inspect(err));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				logger.info(response);
				callback(response, null);
			} else {
				let response = {
					"code": 200,
					"message": "Score was deleted"
				};
				callback(null, response);
			}
		});
	}
}

module.exports = Score;