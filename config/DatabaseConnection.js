// Imports
const sensitiveInfo = require('./SensitiveInfo.json');
const mysql = require('mysql');

class DatabaseConnection {
    static createConnection() {

        // Set up connection to database.
        // TODO: add security
        let con = mysql.createConnection({
            host: sensitiveInfo.host,
            user: sensitiveInfo.user,
            password: sensitiveInfo.password,
            database: sensitiveInfo.database,
            port: sensitiveInfo.port
        });

        return con;
    }
}

module.exports = DatabaseConnection;