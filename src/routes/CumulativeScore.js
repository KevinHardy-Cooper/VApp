/*
    MOD-008
 */

// Imports
const Score = require("./Score");
const DatabaseConnection = require("../../config/DatabaseConnection");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class CumulativeScore extends Score {
	static calculateCumulativeScore(userId, callback) {
		// Calculates cumulative vulnerability score of all social medias.
		let inserts = [userId];
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT AVG(score) as avg_score" +
			" FROM Scores t1" +
			" WHERE t1.time =" +
			" (SELECT MAX(t2.time) from Scores t2 WHERE t2.type_id = t1.type_id and user_id = ? group by type_id)" +
			" and t1.type_id != 1";
		con.query(sql, inserts, function (error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else {
				let response = {
					"code" : 200,
					"message": "Successfully calculated cumulative score",
					"avgScore": result[0].avg_score
				};
				callback(null, response);
			}
		});
	}
}

module.exports = CumulativeScore;