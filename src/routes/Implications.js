/*
    MOD-011
 */

// Imports
const DatabaseConnection = require("../../config/DatabaseConnection");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class Implications {
	static getImplications(socialMedia, settingName, settingState, callback) {
		let con = DatabaseConnection.createConnection();
		let inserts = [socialMedia, settingName, settingState+""];
		let sql = `select Implications.description
                    from Implications 
                    inner join Setting_States 
                    on Setting_States.id = Implications.setting_state_id 
                    inner join Settings 
                    on Implications.setting_id = Settings.id 
                    inner join Social_Media 
                    on Settings.social_media_id = Social_Media.id
                     where Social_Media.name = ? 
                     and Settings.name = ? and Setting_States.state = ?`;
		con.query(sql, inserts , function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			callback(null, result);
		});
	}
	
	static getInstructions(socialMedia, settingName, settingState, callback) {
		let con = DatabaseConnection.createConnection();
		let inserts = [socialMedia, settingName, settingState+""];
		let sql = `select Implications.instructions
                    from Implications 
                    inner join Setting_States 
                    on Setting_States.id = Implications.setting_state_id 
                    inner join Settings 
                    on Implications.setting_id = Settings.id 
                    inner join Social_Media 
                    on Settings.social_media_id = Social_Media.id
                     where Social_Media.name = ? 
                     and Settings.name = ? and Setting_States.state = ?`;
		con.query(sql, inserts, function (err, result) {
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			}
			callback(null, result);
		});
	}
}

module.exports = Implications;