const assert = require("assert");
const CumulativeScore = require("../src/routes/CumulativeScore");
const User = require("../src/routes/User");
const Score = require("../src/routes/Score");

// This is testing the CumulativeScore module
describe("CumulativeScore", function() {
	let valid_high_amount = 100;
	let valid_type_id_high = 4;
	let valid_middle_amount = 50;
	let valid_type_id_middle = 3;
	let valid_low_amount = 0;
	let valid_type_id_low = 2;
	let valid_email = "test@email.com";
	let valid_password = "test_password";
	let valid_user_id = 0;
	let valid_session_id = "test_session_id";
	let invalid_user_id = 0;
	
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
			Score.insertScore(valid_user_id, valid_type_id_high, valid_high_amount, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "New score inserted");
					done();
				}
			});
		});
		it("shall insert a test score into the database", function(done) {
			Score.insertScore(valid_user_id, valid_type_id_middle, valid_middle_amount, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "New score inserted");
					done();
				}
			});
		});
		it("shall insert a test score into the database", function(done) {
			Score.insertScore(valid_user_id, valid_type_id_low, valid_low_amount, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "New score inserted");
					done();
				}
			});
		});
	});
	context("calculateCumulativeScore", function () {
		it("shall retrieve an average score given user id from the database", function(done) {
			CumulativeScore.calculateCumulativeScore(valid_user_id,function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Successfully calculated cumulative score",);
					assert.deepStrictEqual(result.avgScore, 50);
					done();
				}
			});
		});
		it("shall attempt to handle retrieving an average score given invalid user id from the database", function(done) {
			CumulativeScore.calculateCumulativeScore(invalid_user_id,function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "Cumulative score not calculated given invalid user id");
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