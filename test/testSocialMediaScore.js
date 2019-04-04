const assert = require("assert");
const SocialMediaScore = require("../src/routes/SocialMediaScore");
const User = require("../src/routes/User");
const Score = require("../src/routes/Score");

// This is testing the SocialMediaScore module
describe("SocialMediaScore", function() {
	let valid_email = "test@email.com";
	let valid_password = "test_password";
	let valid_user_id = 99;
	let valid_social_media = "twitter";
	let valid_settings = {
		"geo_enabled" : "true",
		"protected" : "false",
		"discoverable_by_email" : "true"
	};
	let invalid_settings = {};
	let valid_session_id = "test_session_id";
	let invalid_session_id = "not real_session_id";
	let invalid_social_media = "not_twitter";
	
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
		it("shall set session id for valid user", function(done) {
			User.setSessionIdByUserId(valid_user_id, valid_session_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "SessionId has been updated for User");
					assert.deepStrictEqual(result.sessionId, valid_session_id);
					done();
				}
			});
		});
	});
	context("delegate", function() {
		it("shall test delegate for valid session id", function (done) {
			SocialMediaScore.calculateSocialMediaScore(valid_social_media, valid_session_id, valid_settings, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.success, "Successful calculation of social media score");
					done();
				}
			});
		});
		it("shall test delegate for handling invalid session id", function (done) {
			SocialMediaScore.calculateSocialMediaScore(valid_social_media, invalid_session_id, valid_settings, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "User does not exist for sessionId in SocialMediaScore");
					done();
				}
			});
		});
		it("shall test delegate for handling invalid settings", function (done) {
			SocialMediaScore.calculateSocialMediaScore(valid_social_media, valid_session_id, invalid_settings, function (error, result) {
				if (error) {
					assert.deepStrictEqual(error.code, 415);
					assert.deepStrictEqual(error.message, "Weight of implications not calculated in SocialMediaScore");
					done();
				} else {
					done();
				}
			});
		});
		it("shall test delegate for handling invalid social media", function (done) {
			SocialMediaScore.calculateSocialMediaScore(invalid_social_media, valid_session_id, valid_settings, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 415);
					assert.deepStrictEqual(result.message, "Unsupported social media type");
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