/*
    MOD-011
 */

// Imports
const DatabaseConnection = require('../../config/DatabaseConnection');

class Implications {
    static getImplicationsForGivenSocialMedia() {
        // returns all implications for given social media
    }

    static getImplicationsForGivenSocialMediaSetting(settingId, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT * ' +
                    'FROM Implications ' +
                    'INNER JOIN Settings ' +
                    'ON Implications.setting_id = Settings.id ' +
                    'WHERE Settings.id = ' + con.escape(settingId);
        con.query(sql , function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, result);
        });
    }

    static getImplicationsForGivenSocialMediaSettingState() {
        // returns implication for given social media, given setting, and given state
    }

    static getImplications() {
        // returns all implications
    }

    static getInstructionsForGivenImplication(implicationId, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT * ' +
                    'FROM Implications ' +
                    'WHERE id = ' + con.escape(implicationId);
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, result);
        });
    }
}

module.exports = Implications;