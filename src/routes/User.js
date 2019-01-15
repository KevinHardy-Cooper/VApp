/*
    MOD-006
 */

// Imports
const DatabaseConnection = require('../../config/DatabaseConnection');

class User {
    static getUserByEmail(email) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT * ' +
                    'FROM  Users ' +
                    'WHERE email = ' + con.escape(email);
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, result);
        });
    }

    static getUser(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT * ' +
                    'FROM  Users ' +
                    'WHERE email = ' + con.escape(email) +
                    ' AND password = ' + con.escape(password);
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, result);
        });
    }

    static insertUser(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'INSERT INTO Users (email, password) ' +
                    'VALUES (' + con.escape(email) + ', ' + con.escape(password) + ')';
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, 200);
        });
    }

    static nullifySessionId(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'UPDATE Users ' +
                    'SET session_id = NULL ' +
                    'WHERE email = ' + con.escape(email) +
                    ' AND password = ' + con.escape(password);
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, 200);
        });
    }
}

module.exports = User;