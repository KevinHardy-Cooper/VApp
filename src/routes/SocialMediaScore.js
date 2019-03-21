/*
    MOD-012
 */

// Imports
const Score = require("./Score");
const User = require("./User");
const DatabaseConnection = require("../../config/DatabaseConnection");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class SocialMediaScore extends Score {

	// Calculates score for given social media given setting
	// Receives a string for socialMediaName and arrays for settingNames and settingStates
	static calculateSocialMediaScore(socialMediaName, sessionId, settings, callback) {

		// Establish database connection
		let con = DatabaseConnection.createConnection();

		// Prepare query
		// Get all the implications' weights given the social media, setting names, and setting states
		let sql = `SELECT SUM(Implications.weight) as score
                    from Settings 
                    inner join Social_Media 
                    on Settings.social_media_id = Social_Media.id 
                    inner join Implications 
                    on Implications.setting_id=Settings.id 
                    inner join Setting_States 
                    on Setting_States.id = Implications.setting_State_id
                    WHERE ((Social_Media.name = ?) AND ((Settings.name = ?
                    AND Setting_States.state = ?)`;

		let inserts = [];
		let settingNames = [];
		let settingStates = [];

        if (socialMediaName === "twitter") {
            // Binding parameters
            inserts = [socialMediaName];
            settingNames = ["geo_enabled", "protected", "discoverable_by_email", "use_cookie_personalization", "allow_dms_from"];
            // need to convert boolean values to strings
            settingStates = [settings.geo_enabled+"", settings.protected+"", settings.discoverable_by_email+"", settings.use_cookie_personalization+"", settings.allow_dms_from+""];
        } else if (socialMediaName === "facebook") {
            // Binding parameters
            inserts = [socialMediaName];
            settingNames = ["future_posts", "friend_requests", "friends_list", "discoverable_by_email",
                "discoverable_by_phone", "discoverable_by_search_engine"];
            settingStates = [settings.future_posts, settings.friend_requests, settings.friends_list,
                settings.discoverable_by_email, settings.discoverable_by_phone, settings.discoverable_by_search_engine];
        } else if (socialMediaName === "instagram") {
			// Binding parameters
			inserts = [socialMediaName];
			settingNames = ["account_privacy", "activity_status", "story_sharing", "usertag_review"];
			settingStates = [settings.account_privacy, settings.activity_status, settings.story_sharing,
				settings.usertag_review];
		} else {
			let obj = {
				"code": 415,
				"failed": "Unsupported social media type"
			};
			callback(null, obj);
			return;
		}

		// Loop through given arrays
		for (let i = 0; i < settingNames.length; i++){
			// Insert setting names and states into parameters
			inserts.push(settingNames[i]);
			inserts.push(settingStates[i]);

			// Adjust query accordingly
			if (i > 0){
				sql += " OR (Settings.name = ?";
				sql += " AND Setting_States.state = ?)";
			}
		}
		sql += "))";

		// Execute query
		con.query(sql, inserts, function (err, result) {
			// Log success or error
			if (err) {
				logger.error(inspect(err));
				callback(err, null);
			} else if (result.length > 0) {
				let score = result[0].score;
				logger.info("Successfully calculated social media score");
				Score.getScoreTypeBySocialMedia(inserts[0], function (err, obj) {
					if (err) {
						logger.error(inspect(err));
						callback(err, null);
					} else if (obj.length > 0) {
						logger.info("Successfully got the score type in SocialMediaScore");
						let typeId = obj[0].id;
						User.getUserBySessionId(sessionId, function (err, obj) {
							if (err) {
								logger.error(inspect(err));
								callback(err, null);
							} else if (obj.statusCode === 200) {
								Score.insertScore(obj[0].id, typeId, score, function (err, obj) {
									if (err) {
										logger.error(inspect(err));
										callback(err, null);
									} else if (obj.statusCode === 200) {
										obj = {
											"code": 200,
											"success": "Successfully inserted score in SocialMediaScore"
										};
										callback(null, obj);
									}
								});
							} else {
								callback(null, obj);
							}
						});
					} else {
						callback(null, obj);
					}
				});
			}
		});
	}
}

module.exports = SocialMediaScore;