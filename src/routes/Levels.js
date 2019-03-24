// Imports
const DatabaseConnection = require("../../config/DatabaseConnection");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class Levels {
	static getLevel(amount, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT name FROM Levels WHERE amount >= ? LIMIT 1";
		con.query(sql, amount, function (err, result) {
			con.end();
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			callback(null, result);
		});
	}
}

module.exports = Levels;