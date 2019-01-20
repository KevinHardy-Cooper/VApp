// Imports
const SensitiveInfo = require('./SensitiveInfo');
const mysql = require('mysql');

// Creating an instance of SensitiveInfo
const sensitiveInfo = new SensitiveInfo();

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