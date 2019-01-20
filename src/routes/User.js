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
        let sql = 'SELECT * FROM Users WHERE email = ?';
        con.query(sql , email, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }else{
                if(result.length >0){
                    if(result[0].password === password){
                        result.statusCode = 200;
                        result.statusMessage = "Login Successful";
                    }
                    else{
                        result.statusCode = 204;
                        result.statusMessage = "Email and password does not match";
                    }
                }
                else{
                    result.statusCode = 204;
                    result.statusMessage = "Email does not exist";
                }
            }
            callback(null, result);
        });
    }

    static insertUser(email, password, callback) {
        let con = DatabaseConnection.createConnection();
        let user={
            "email":email,
            "password":password
        };
        let sql = 'SELECT * FROM Users WHERE email = ?';
        con.query(sql , email, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            } else if (result.length > 0) {
                result.statusCode = 204;
                result.statusMessage = "Email already exists";
                callback(null, result);
            } else {
                let sql = 'INSERT INTO Users SET ?';
                con.query(sql, user, function (err, obj) {
                    if (err) {
                        logger.error(inspect(err));
                        obj.statusCode = 400;
                        obj.statusMessage = "Sign Up Failed";
                        throw err;
                    } else {
                        obj.statusCode = 200;
                        obj.statusMessage = "Sign Up Successful";
                        callback(null, obj);
                    }
                });
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