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
        // TODO: add security
        con.query("SELECT * FROM Implications INNER JOIN Settings ON Implications.setting_id = Settings.id WHERE Settings.id = '" + settingId + "'" , function (err, result) {
            if (err) throw err;
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
        // TODO: add security
        con.query("SELECT * FROM Implications WHERE id = '" + implicationId + "'" , function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    }
}

module.exports = Implications;