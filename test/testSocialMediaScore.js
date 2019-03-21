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
	let valid_session_id = "test_session_id";
	let invalid_session_id = "not real_session_id";
	let invalid_social_media = "not_twitter";
	
	context("setUp", function() {
		it("shall insert a test user into the database", function (done) {
			User.insertUser(valid_email, valid_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "New user inserted");
					valid_user_id = obj.insertId;
					done();
				}
			});
		});
		it("shall set session id for valid user", function (done) {
			User.setSessionId(valid_email, valid_password, valid_session_id, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, valid_session_id);
					done();
				}
			});
		});
	});
	context("delegate", function() {
		it("shall test delegate for valid session id", function (done) {
			SocialMediaScore.calculateSocialMediaScore(valid_social_media, valid_session_id, valid_settings, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.code, 200);
					assert.deepStrictEqual(obj.success, "Successfully inserted score in SocialMediaScore");
					done();
				}
			});
		});
		it("shall test delegate for handling invalid session id", function (done) {
			SocialMediaScore.calculateSocialMediaScore(valid_social_media, invalid_session_id, valid_settings, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 204);
					assert.deepStrictEqual(obj.statusMessage, "User does not exist for session_id");
					done();
				}
			});
		});
		it("shall test delegate for handling invalid social media", function (done) {
			SocialMediaScore.calculateSocialMediaScore(invalid_social_media, valid_session_id, valid_settings, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.code, 415);
					assert.deepStrictEqual(obj.failed, "Unsupported social media type");
					done();
				}
			});
		});
	});
	context("cleanUp", function() {
		it("shall delete test score", function(done) {
			Score.deleteScore(valid_user_id, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj, 200);
					done();
				}
			});
		});
		it("shall delete test user", function(done) {
			User.deleteUser(valid_email, valid_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj, 200);
					done();
				}
			});
		});
	});
});