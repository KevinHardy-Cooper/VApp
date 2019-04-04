const assert = require("assert");
const SignOut = require("../src/routes/SignOut");
const User = require("../src/routes/User");

// This is testing the SignOut module
describe("SignOut", function() {
	let valid_email = "test@email.com";
	let valid_password = "test_password";
	let valid_session_id = "test_session_id";
	let invalid_session_id = "not real_session_id";
	let valid_user_id = 0;
	
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
			SignOut.delegate(valid_session_id, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Sign out operation completed");
					done();
				}
			});
		});
		it("shall test delegate for handling invalid session id", function (done) {
			SignOut.delegate(invalid_session_id, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "User does not exist for sessionId in SignOut");
					done();
				}
			});
		});
	});
	// Cleaning up
	context("cleanUp", function() {
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