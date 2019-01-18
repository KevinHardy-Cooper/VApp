/*
    MOD-011
 */

// Imports
const DatabaseConnection = require('../../config/DatabaseConnection');
const logger = require('../../config/log.js');
const inspect = require('util').inspect;

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
                    'WHERE Settings.id = ?';
        con.query(sql, settingId , function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully got implications for given social media setting in Implications");
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
                    'WHERE id = ?';
        con.query(sql, implicationId, function (err, result) {
            if (err) {
                logger.error(inspect(err));
                throw err;
            }
            logger.info("Successfully got instructions for given implication in Implications");
            callback(null, result);
        });
    }
}

module.exports = Implications;