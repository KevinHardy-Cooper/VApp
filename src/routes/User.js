/*
    MOD-006
 */

// Imports
const DatabaseConnection = require('../../config/DatabaseConnection');

class User {
    static getUserByEmail() {
        let con = DatabaseConnection.createConnection();
        // TODO: add security
        con.query("SELECT * FROM  Users WHERE email = '" + email + "'", function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    }

    static getUser(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        // TODO: add security
        con.query("SELECT * FROM  Users WHERE email = '" + email + "' AND password = '" + password + "'", function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    }

    static insertUser(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        // TODO: add security
        con.query("INSERT INTO Users (email, password) VALUES ('" + email + "', '" + password + "')", function (err, result) {
            if (err) throw err;
            callback(null, 200);
        });
    }

    static nullifySessionId(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        // TODO: add security
        con.query("UPDATE Users SET session_id = NULL WHERE email = '" + email + "' AND password = '" + password + "'", function (err, result) {
            if (err) throw err;
            callback(null, 200);
        });
    }
}

module.exports = User;