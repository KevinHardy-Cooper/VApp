const assert = require("assert");
const History = require("../src/routes/History");
const Score = require("../src/routes/Score");
const User = require("../src/routes/User");

// This is testing the History module
describe("History", function() {
	let valid_user_id = 0;
	let valid_type_id = 2;
	let valid_email = "test@email.com";
	let valid_password = "test_password";
	let valid_score = 99;
	let valid_session_id = "test_session_id";
	let valid_social_media = "twitter";
	let invalid_session_id = "not_real_session_id";
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
	context("getScoresBySessionId", function() {
		it("shall retrieve scores given session id from the database", function (done) {
			History.getScoresBySessionId(valid_session_id, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "All user's scores have been retrieved");
					assert.deepStrictEqual(result.scores[0].type_id, valid_type_id);
					assert.deepStrictEqual(result.scores[0].score, valid_score);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve scores given invalid session id from the database", function (done) {
			History.getScoresBySessionId(invalid_session_id, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "User does not exist for sessionId in History");
					done();
				}
			});
		});
	});
	context("getMostRecentScoresBySessionId", function() {
		it("shall retrieve scores given session id from the database", function (done) {
			History.getMostRecentScoresBySessionId(valid_session_id, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "All most recent users scores have been retrieved");
					assert.deepStrictEqual(result.scores[0].type_id, valid_type_id);
					assert.deepStrictEqual(result.scores[0].score, valid_score);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve scores given invalid session id from the database", function (done) {
			History.getMostRecentScoresBySessionId(invalid_session_id, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "User does not exist for sessionId in History");
					done();
				}
			});
		});
	});
	context("getMostRecentGradeBySessionIdAndSocialMedia", function() {
		it("shall retrieve most recent level given session id and social media from the database", function (done) {
			History.getMostRecentGradeBySessionIdAndSocialMedia(valid_session_id, valid_social_media, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Grade for most recent user score for a given social media was retrieved");
					assert.deepStrictEqual(result.grade, "F");
					assert.deepStrictEqual(result.score, 100);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve scores given invalid session id and social media from the database", function (done) {
			History.getMostRecentGradeBySessionIdAndSocialMedia(invalid_session_id, valid_social_media, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "User does not exist for sessionId in History");
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve scores given valid session id and invalid social media from the database", function (done) {
			History.getMostRecentGradeBySessionIdAndSocialMedia(valid_session_id, invalid_social_media, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "Score type not returned for social media in History");
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