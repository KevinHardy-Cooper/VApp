// Imports
const DatabaseConnection = require("../../config/DatabaseConnection");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class Grade {
	static getGrade(personalScore, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT name FROM Grades WHERE amount >= ? LIMIT 1";
		con.query(sql, personalScore, function (error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else if (result.length > 0) {
				let response = {
					"code": 200,
					"message": "Grade returned for amount",
					"grade": result[0].name,
					"score": personalScore
				};
				callback(null, response);
			} else if (result.length === 0) {
				let response = {
					"code": 204,
					"message": "Grade not returned for amount"
				};
				callback(null, response);
			}
		});
	}
}

module.exports = Grade;