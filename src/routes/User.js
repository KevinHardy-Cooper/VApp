/*
    MOD-006
 */

// Imports
const DatabaseConnection = require('../../config/DatabaseConnection');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;

class User {
    static getUserByEmail(email, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT * FROM Users WHERE email = ? LIMIT 1';
        con.query(sql, email, function(err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            } else {
                if(result.length === 1){
                    result.statusCode = 200;
                    result.statusMessage = "User exists for email";
                }
                else {
                    result.statusCode = 204;
                    result.statusMessage = "User does not exist for email";
                }
            }
            callback(null, result);
        });
    }

    static getUser(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        let inserts = [email, password];
        let sql = 'SELECT * FROM Users WHERE email = ? AND password = ? LIMIT 1';
        con.query(sql, inserts, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            } else {
                if(result.length === 1){
                    result.statusCode = 200;
                    result.statusMessage = "User exists for given email and password";                }
                else {
                    result.statusCode = 204;
                    result.statusMessage = "User does not exist for given email and password";                }
            }
            callback(null, result);
        });
    }

    static insertUser(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        let inserts = {
            "email": email,
            "password": password
        };
        let sql = 'INSERT INTO Users SET ?';
        con.query(sql, inserts, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            } else {
                result.statusCode = 200;
                result.statusMessage = "New user inserted";
                callback(null, result);
            }
        });
    }

    static nullifySessionId(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'UPDATE Users ' +
                    'SET session_id = NULL ' +
                    'WHERE email = ?'+
                    ' AND password = ?';
        con.query(sql, email, password, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully set session id to null in User");
            callback(null, 200);
        });
    }
}

module.exports = User;