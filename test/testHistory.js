const assert = require("assert");
const History = require("../src/routes/History");
const Score = require("../src/routes/Score");
const User = require("../src/routes/User");

// This is testing the History module
describe("History", function() {
	let valid_user_id = 99;
	let valid_type_id = 2;
	let valid_email = "test@email.com";
	let valid_password = "test_password";
	let valid_score = 99;
	let valid_session_id = "test_session_id";
	let valid_social_media = "twitter";
	let invalid_session_id = "not_real_session_id";
	let invalid_user_id = 0;
	let invalid_social_media = "not_twitter";
	context("setUp", function() {
		it("shall insert a test user into the database", function(done) {
			User.insertUser(valid_email, valid_password, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "New user inserted");
					valid_user_id = obj.insertId; // getting the user_id of the newly inserted test user
					done();
				}
			});
		});
		it("shall insert a test score into the database", function(done) {
			Score.insertScore(valid_user_id, valid_type_id, valid_score, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "New score inserted");
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
	context("getScoresBySessionId", function() {
		it("shall retrieve scores given session id from the database", function (done) {
			History.getScoresBySessionId(valid_session_id, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].user_id, valid_user_id);
					assert.deepStrictEqual(obj[0].type_id, valid_type_id);
					assert.deepStrictEqual(obj[0].score, valid_score);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve scores given invalid session id from the database", function (done) {
			History.getScoresBySessionId(invalid_session_id, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 204);
					assert.deepStrictEqual(obj.statusMessage, "User does not exist for session_id");
					done();
				}
			});
		});
	});
	context("getScoresByUserIdAndSocialMedia", function() {
		it("shall retrieve scores given user id and social media from the database", function (done) {
			History.getScoresByUserIdAndSocialMedia(valid_user_id, valid_social_media, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].user_id, valid_user_id);
					assert.deepStrictEqual(obj[0].type_id, valid_type_id);
					assert.deepStrictEqual(obj[0].score, valid_score);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve scores given invalid user id and social media from the database", function (done) {
			History.getScoresByUserIdAndSocialMedia(invalid_user_id, valid_social_media, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve scores given valid user id and invalid social media from the database", function (done) {
			History.getScoresByUserIdAndSocialMedia(valid_user_id, invalid_social_media, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
	});
	context("getMostRecentLevelBySessionIdAndSocialMedia", function() {
		it("shall retrieve most recent level given session id and social media from the database", function (done) {
			History.getMostRecentLevelBySessionIdAndSocialMedia(valid_session_id, valid_social_media, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].name, "F");
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve scores given invalid session id and social media from the database", function (done) {
			History.getMostRecentLevelBySessionIdAndSocialMedia(invalid_session_id, valid_social_media, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 204);
					assert.deepStrictEqual(obj.statusMessage, "User does not exist for session_id");
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve scores given valid session id and social media from the database", function (done) {
			History.getMostRecentLevelBySessionIdAndSocialMedia(valid_session_id, invalid_social_media, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
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