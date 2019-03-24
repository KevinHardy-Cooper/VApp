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
		con.query(sql, inserts, function (err, result) {
			con.end();
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			logger.info("Successfully calculated cumulative score in CumulativeScore");
			let obj = {
				"avg_score": result[0].avg_score,
				"code" : 200
			};
			callback(null, obj);
		});
	}
}

module.exports = CumulativeScore;