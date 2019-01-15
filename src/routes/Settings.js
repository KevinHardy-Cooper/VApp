/*
    MOD-007
 */

// Imports
const DatabaseConnection = require('../../config/DatabaseConnection');

class Settings {
    static connectToGivenSocialMedia() {
        // oauth for given social media
    }

    static getSettings(socialMedia, callback) {
        let con = DatabaseConnection.createConnection();
        let sql = 'SELECT Settings.id, Settings.name, Settings.social_media_id ' +
                    'FROM Settings ' +
                    'INNER JOIN Social_Media ' +
                    'ON Settings.social_media_id = Social_Media.id ' +
                    'WHERE Social_Media.name = ' + con.escape(socialMedia);
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, result);
        });
    }

    static getUserSettings() {
        // retrieves settings for given social media from social media platform API call
    }

}

module.exports = Settings;