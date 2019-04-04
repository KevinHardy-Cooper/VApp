const assert = require("assert");
const User = require("../src/routes/User");
const Score = require("../src/routes/Score");

// This is testing the Score module
describe("Score", function() {
	let valid_user_id = 99;
	let valid_type_id = 2;
	let valid_email = "hey@email.com";
	let valid_password = "test_password";
	let valid_score = 99;
	let invalid_user_id = 0;
	let valid_social_media = "twitter";
	let invalid_social_media = "not_twitter";
	let invalid_type_id = 99;
	context("setUp", function() {
		it("shall insert a test user into the database", function(done) {
			User.insertUser(valid_email, valid_password, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "New user inserted");
					done();
				}
			});
		});
		it("shall get the test user by email and password from the database", function (done) {
			User.getUser(valid_email, valid_password, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "User exists for given email and password");
					assert.ok(result.userId>0);
					valid_user_id = result.userId;
					done();
				}
			});
		});
	});
	context("insertScore", function() {
		it("shall insert a test score into the database", function(done) {
			Score.insertScore(valid_user_id, valid_type_id, valid_score, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "New score inserted");
					done();
				}
			});
		});
	});
	context("getMostRecentScoreByUserIdAndScoreType", function() {
		it("shall get test score by user id and score type from the database", function(done) {
			Score.getMostRecentScoreByUserIdAndScoreType(valid_user_id, valid_type_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "User's most recent score have been retrieved for given score type");
					assert.deepStrictEqual(result.score, valid_score);
					done();
				}
			});
		});
		it("shall handle attempting to get test score by non existent user id from the database", function(done) {
			Score.getMostRecentScoreByUserIdAndScoreType(invalid_user_id, valid_type_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "Invalid userId or typeId");
					done();
				}
			});
		});
		it("shall handle attempting to get test score by invalid type id from the database", function(done) {
			Score.getMostRecentScoreByUserIdAndScoreType(valid_user_id, invalid_type_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "Invalid userId or typeId");
					done();
				}
			});
		});
	});
	context("getScoresByUserId", function() {
		it("shall get test score by user id from the database", function(done) {
			Score.getScoresByUserId(valid_user_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Scores returned for userId");
					assert.deepStrictEqual(result.scores[0].type_id, valid_type_id);
					assert.deepStrictEqual(result.scores[0].score, valid_score);
					done();
				}
			});
		});
		it("shall handle attempting to get test score by non existent user id from the database", function(done) {
			Score.getScoresByUserId(invalid_user_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "Invalid userId used to get scores");
					done();
				}
			});
		});
	});
	context("getScoreTypeBySocialMedia", function() {
		it("shall get test score type by social media from the database", function(done) {
			Score.getScoreTypeBySocialMedia(valid_social_media, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Score type returned for social media");
					assert.deepStrictEqual(result.scoreType, valid_type_id);
					done();
				}
			});
		});
		it("shall handle attempting to get score type by non existent social media from the database", function(done) {
			Score.getScoreTypeBySocialMedia(invalid_social_media, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "Score type not returned for social media");
					done();
				}
			});
		});
	});
	context("getMostRecentScoresGivenUserId", function() {
		it("shall get most recent test scores by user id from the database", function(done) {
			Score.getMostRecentScoresGivenUserId(valid_user_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "User's most recent scores have been retrieved");
					assert.deepStrictEqual(result.scores[0].type_id, valid_type_id);
					assert.deepStrictEqual(result.scores[0].score, valid_score);
					done();
				}
			});
		});
		it("shall handle attempting to get most recent test scores by non existent user id from the database", function(done) {
			Score.getMostRecentScoresGivenUserId(invalid_user_id,function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "User's most recent scores have been retrieved");
					assert.deepStrictEqual(result.scores, []);
					done();
				}
			});
		});
	});
	// Cleaning up
	context("cleanUp", function() {
		it("shall delete test score", function(done) {
			Score.deleteScore(valid_user_id, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Score was deleted");
					done();
				}
			});
		});
		it("shall delete test user", function(done) {
			User.deleteUser(valid_email, valid_password, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "User was deleted");
					done();
				}
			});
		});
	});
});