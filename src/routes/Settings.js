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
        // TODO: add security
        con.query("SELECT * FROM Settings INNER JOIN Social_Media ON Settings.social_media_id = Social_Media.id WHERE Social_Media.name = '" + socialMedia + "'", function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    }

    static getUserSettings() {
        // retrieves settings for given social media from social media platform API call
    }

}

module.exports = Settings;