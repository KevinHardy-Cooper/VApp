// Imports
const DatabaseConnection = require("../../config/DatabaseConnection");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class Grade {
	static getGrade(amount, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT name, amount FROM Grades WHERE amount >= ? LIMIT 1";
		con.query(sql, amount, function (error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				logger.info(response);
				callback(response, null);
			} else if (result.length > 0) {
				let response = {
					"code": 200,
					"message": "Grade returned for amount",
					"grade": result[0].name,
					"score": result[0].amount
				};
				logger.info(response);
				callback(null, response);
			} else if (result.length === 0) {
				let response = {
					"code": 204,
					"message": "Grade not returned for amount"
				};
				logger.info(response);
				callback(null, response);
			}
		});
	}
}

module.exports = Grade;