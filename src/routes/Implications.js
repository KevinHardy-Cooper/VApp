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
		let sql = `select Implications.description as implications
                    from Implications 
                    inner join Setting_States 
                    on Setting_States.id = Implications.setting_state_id 
                    inner join Settings 
                    on Implications.setting_id = Settings.id 
                    inner join Social_Media 
                    on Settings.social_media_id = Social_Media.id
                     where Social_Media.name = ? 
                     and Settings.name = ? and Setting_States.state = ? limit 1`;
		con.query(sql, inserts , function (error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else if (result.length === 0) {
				let response = {
					"code": 415,
					"message": "Invalid Setting Name/Invalid Setting Name/Invalid Setting State social media type"
				};
				callback(response, null);
			} else {
				let response = {
					"code": 200,
					"message": "Implications for Social Media, Setting and Setting State combination",
					"implications": result[0].implications
				};
				callback(null, response);
			}
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
		con.query(sql, inserts, function (error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else if (result.length === 0) {
				let response = {
					"code": 415,
					"message": "Invalid Setting Name/Invalid Setting Name/Invalid Setting State social media type"
				};
				callback(response, null);
			} else {
				let response = {
					"code": 200,
					"message": "Instructions for Social Media, Setting and Setting State combination",
					"instructions": result[0].instructions
				};
				callback(null, response);
			}
		});
	}

	static getAllWeightsForSetting(socialMedia, settingName, callback) {
		let con = DatabaseConnection.createConnection();
		let inserts = [socialMedia, settingName];
		let sql = `select Setting_States.state, Implications.weight
                    from Implications
                    inner join Setting_States
                    on Setting_States.id = Implications.setting_state_id
                    inner join Settings
                    on Implications.setting_id = Settings.id
                    inner join Social_Media
                    on Settings.social_media_id = Social_Media.id
                     where Social_Media.name = ?
                     and Settings.name = ?`;
		con.query(sql, inserts, function (error, result) {
			con.end();
			if (error) {
				logger.error(inspect(error));
				let response = {
					"code": 400,
					"message": "Domain validation errors, missing data"
				};
				callback(response, null);
			} else if (result.length === 0) {
				let response = {
					"code": 415,
					"message": "Invalid Social Media/Invalid Setting Name"
				};
				callback(response, null);
			} else {
				let response = {
					"code": 200,
					"message": "All implication weights for a setting",
					"weights": result
				};
				callback(null, response);
			}
		});
	}
}

module.exports = Implications;