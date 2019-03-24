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
		let sql = "SELECT id FROM Users WHERE email = ? LIMIT 1";
		con.query(sql, email, function(error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else if (result.length === 1) {
				let response = {
					"code": 200,
					"message": "User exists for email"
				};
				callback(null, response);
			} else if (result.length === 0) {
				let response = {
					"code": 204,
					"message": "Unauthorized - Invalid email"
				};
				callback(null, response);
			}
		});
	}

	static getUser(email, password, callback) {
		let con = DatabaseConnection.createConnection();
		let inserts = [email, password];
		let sql = "SELECT id FROM Users WHERE email = ? AND password = ? LIMIT 1";
		con.query(sql, inserts, function (error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else if (result.length === 1) {
				let response = {
					"code": 200,
					"message": "User exists for given email and password",
					"userId": result[0].id
				};
				callback(null, response);
			} else if (result.length === 0) {
				let response = {
					"code": 204,
					"message": "Unauthorized - Invalid email or password"
				};
				callback(null, response);
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
		con.query(sql, inserts, function (error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else if (result.affectedRows === 1) {
				let response = {
					"code": 200,
					"message": "New user inserted"
				};
				callback(null, response);
			}
		});
	}
    
	static getUserBySessionId(sessionId, callback) {
		let con = DatabaseConnection.createConnection();
		let insert = { "session_id": sessionId };
		let sql = "SELECT id FROM Users WHERE ? LIMIT 1";
		con.query(sql, insert, function(error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else if (result.length === 1) {
				let response = {
					"code": 200,
					"message": "User exists for sessionId",
					"userId": result[0].id
				};
				callback(null, response);
			} else {
				let response = {
					"code": 204,
					"message": "User does not exist for sessionId"
				};
				callback(null, response);
			}
		});
	}
    
	static setSessionIdByUserId(userId, sessionId, callback) {
		let con = DatabaseConnection.createConnection();
		let inserts = [sessionId, userId];
		let sql = "UPDATE Users SET session_id = ? WHERE id = ?";
		con.query(sql, inserts, function (error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else if (result.affectedRows === 1) { // when a successful update takes place
				let response = {
					"code": 200,
					"message": "SessionId has been updated for User",
					"sessionId": sessionId
				};
				callback(null, response);
			} else if (result.affectedRows === 0) { // user does not exist
				let response = {
					"code": 204,
					"message": "SessionId was not updated for User"
				};
				callback(null, response);
			}
		});
	}
    
	static nullifySessionIdByUserId(userId, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "UPDATE Users " +
            "SET session_id = NULL " +
            "WHERE id = ?";
		let inserts = [userId];
		con.query(sql, inserts, function (error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else if (result.affectedRows === 1) { // when a successful update takes place
				let response = {
					"code": 200,
					"message": "Successful nullification"
				};
				callback(null, response);
			} else if (result.affectedRows === 0 ) { // update didn't take place
				let response = {
					"code": 204,
					"message": "User does not exist for given userId"
				};
				callback(null, response);
			}
		});
	}
	
	// Only used in testing
	static deleteUser(email, password, callback) {
		let con = DatabaseConnection.createConnection();
		let sql = "DELETE FROM Users " +
			"WHERE email = ? AND password = ?";
		let inserts = [email, password];
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
					"code": 200,
					"message": "User was deleted"
				};
				callback(null, response);
			}
		});
	}
}

module.exports = User;