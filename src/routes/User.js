/*
    MOD-006
 */

// Imports
const DatabaseConnection = require('../../config/DatabaseConnection');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;

class User {
    static getUser(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT * ' +
                    'FROM  Users ' +
                    'WHERE email = ?'+
                    ' AND password = ?';
        con.query(sql, email, password, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully got user in User");
            callback(null, result);
        });
    }

    static insertUser(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'INSERT INTO Users (email, password) ' +
                    'VALUES (?, ?)';
        con.query(sql, email, password, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully inserted user in User");
            callback(null, 200);
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