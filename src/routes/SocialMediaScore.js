/*
    MOD-012
 */

// Imports
const Score = require("./Score");
const User = require("./User");
const CumulativeScore = require("./CumulativeScore");
const DatabaseConnection = require("../../config/DatabaseConnection");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class SocialMediaScore extends Score {

	// Calculates score for given social media given setting
	// Receives a string for socialMedia and arrays for settingNames and settingStates
	static calculateSocialMediaScore(socialMedia, sessionId, settings, callback) {

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

		if (socialMedia === "twitter") {
			// Binding parameters
			inserts = [socialMedia];
			settingNames = ["geo_enabled", "protected", "discoverable_by_email", "use_cookie_personalization", "allow_dms_from"];
			// need to convert boolean values to strings
			settingStates = [settings.geo_enabled+"", settings.protected+"", settings.discoverable_by_email+"", settings.use_cookie_personalization+"", settings.allow_dms_from+""];
		} else if (socialMedia === "facebook") {
			// Binding parameters
			inserts = [socialMedia];
			settingNames = ["future_posts", "friend_requests", "friends_list", "discoverable_by_email",
				"discoverable_by_phone", "discoverable_by_search_engine"];
			settingStates = [settings.future_posts, settings.friend_requests, settings.friends_list,
				settings.discoverable_by_email, settings.discoverable_by_phone, settings.discoverable_by_search_engine];
		} else if (socialMedia === "instagram") {
			// Binding parameters
			inserts = [socialMedia];
			settingNames = ["account_privacy", "activity_status", "story_sharing", "usertag_review"];
			settingStates = [settings.account_privacy, settings.activity_status, settings.story_sharing,
				settings.usertag_review];
		} else {
			let result = {
				"code": 415,
				"failed": "Unsupported social media type"
			};
			callback(null, result);
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
		con.query(sql, inserts, function (error, result) {
			con.end();
			// Log success or error
			if (error) {
				logger.error(inspect(error));
				callback(error, null);
			} else if (result.length > 0) {
				let score = result[0].score;
				Score.getScoreTypeBySocialMedia(inserts[0], function (error, result) {
					if (error) {
						logger.error(inspect(error));
						callback(error, null);
					} else if (result.code === 200) {
						let typeId = result.scoreType;
						User.getUserBySessionId(sessionId, function (error, result) {
							if (error) {
								logger.error(inspect(error));
								callback(error, null);
							} else if (result.code === 200) {
								let userId = result.userId;
								Score.insertScore(userId, typeId, score, function (error, result) {
									if (error) {
										logger.error(inspect(error));
										callback(error, null);
									} else if (result.code === 200) {
										CumulativeScore.calculateCumulativeScore(userId, function (error, result) {
											if (error) {
												logger.error(inspect(error));
												callback(err, null);
											} else if (result.code === 200) {
												let cumulativeScore = result.avgScore;
												Score.insertScore(userId, 1, cumulativeScore, function (err, result) {
													if (err) {
														logger.error(inspect(err));
														callback(err, null);
													} else if (result.code === 200) {
														result = {
															"code": 200,
															"success": "Successful calculation of social media score"
														};
														callback(null, result);
													}
												});
											}
										});
									}
								});
							} else if (result.code === 204) {
								let response = {
									"code": 204,
									"message": "User does not exist for sessionId in SocialMediaScore"
								};
								callback(null, response);
							}
						});
					} else if (result.code === 204) {
						let response = {
							"code": 204,
							"message": "Score type not returned for social media in SocialMediaScore"
						};
						callback(null, response);
					}
				});
			} else if (result.length === 0) {
				let response = {
					"code": 204,
					"message": "Weight of implications not calculated in SocialMediaScore"
				};
				callback(null, response);
			}
		});
	}
}

module.exports = SocialMediaScore;