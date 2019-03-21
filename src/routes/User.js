/*
    MOD-006
 */

// Imports
const DatabaseConnection = require("../../config/DatabaseConnection");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class User {
	static getUserByEmail(email, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "SELECT * FROM Users WHERE email = ? LIMIT 1";
		con.query(sql, email, function(err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else {
				if(result.length === 1){
					result.statusCode = 200;
					result.statusMessage = "User exists for email";
				}
				else {
					result.statusCode = 204;
					result.statusMessage = "User does not exist for email";
				}
				callback(null, result);
			}
		});
	}

	static getUser(email, password, callback) {
		let con = DatabaseConnection.createConnection();
		let inserts = [email, password];
		let sql = "SELECT * FROM Users WHERE email = ? AND password = ? LIMIT 1";
		con.query(sql, inserts, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else {
				if (result.length === 1) {
					result.statusCode = 200;
					result.statusMessage = "User exists for given email and password";
				}
				else {
					result.statusCode = 204;
					result.statusMessage = "User does not exist for given email and password";
				}
				callback(null, result);
			}
		});
	}

	static insertUser(email, password, callback) {
		let con = DatabaseConnection.createConnection();
		let inserts = {
			"email": email,
			"password": password
		};
		let sql = "INSERT INTO Users SET ?";
		con.query(sql, inserts, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else {
				result.statusCode = 200;
				result.statusMessage = "New user inserted";
				callback(null, result);
			}
		});
	}
    
	static getUserBySessionId(session_id, callback) {
		let con = DatabaseConnection.createConnection();
		let insert = { "session_id": session_id };
		let sql = "SELECT * FROM Users WHERE ?";
		con.query(sql, insert, function(err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else {
				if(result.length === 1){
					result.statusCode = 200;
					result.statusMessage = "User exists for session_id";
					callback(null, result);
				}
				else {
					result.statusCode = 204;
					result.statusMessage = "User does not exist for session_id";
					callback(null, result);
				}
			}
		});
	}
    
	static setSessionId(email, password, session_id, callback) {
		let con = DatabaseConnection.createConnection();
		let inserts = [session_id, email, password];
		let sql = "UPDATE Users SET session_id = ? WHERE email = ? AND password = ?";
		con.query(sql, inserts, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (result.affectedRows === 1) { // when a successful update takes place
				result.statusCode = 200;
				result.statusMessage = session_id;
				callback(null, result);
			} else if (result.affectedRows === 0) { // user does not exist
				result.statusCode = 204;
				result.statusMessage = "User does not exist for given email and password";
				callback(null, result);
			}
		});
	}
    
	static nullifySessionId(email, password, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "UPDATE Users " +
            "SET session_id = NULL " +
            "WHERE email = ? AND password = ?";
		let inserts = [email, password];
		con.query(sql, inserts, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (result.affectedRows === 1) { // when a successful update takes place
				result.statusCode = 200;
				result.statusMessage = "Successful nullification";
				callback(null, result);
			} else if (result.affectedRows === 0 ) { // update didn't take place
				result.statusCode = 204;
				result.statusMessage = "User does not exist";
				callback(null, result);
			}
		});
	}
	
	// Only used in testing
	static deleteUser(email, password, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "DELETE FROM Users " +
			"WHERE email = ? AND password = ?";
		let inserts = [email, password];
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

module.exports = User;