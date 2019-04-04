const assert = require("assert");
const User = require("../src/routes/User");

// This is testing the User module
describe("User", function() {
	let valid_email = "hey@email.com";
	let valid_password = "test_password";
	let invalid_email = "imnotreal@email.com";
	let valid_session_id = "test_session_id";
	let invalid_session_id = "not_real_session_id";
	let valid_user_id = 0;
	let invalid_user_id = 0;
	
	context("insertUser", function() {
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
	});
	context("getUserByEmail", function() {
		it("shall get the test user by email from the database", function(done) {
			User.getUserByEmail(valid_email, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "User exists for email");
					done();
				}
			});
		});
		it("shall handle attempting to retrieve nonexistent user by email from the database", function(done) {
			User.getUserByEmail(invalid_email, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "Unauthorized - Invalid email");
					done();
				}
			});
		});
	});
	context("getUser", function() {
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
		it("shall handle attempting to retrieve nonexistent user by email and password from the database", function (done) {
			User.getUser(invalid_email, valid_password, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "Unauthorized - Invalid email or password");
					done();
				}
			});
		});
	});
	context("setSessionIdByUserId", function() {
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
		it("shall handle attempting to set session id for nonexistent user", function(done) {
			User.setSessionIdByUserId(invalid_user_id, valid_session_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "SessionId was not updated for User");
					done();
				}
			});
		});
	});
	context("getUserBySessionId", function() {
		it("shall get user for valid session id", function(done) {
			User.getUserBySessionId(valid_session_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "User exists for sessionId");
					assert.deepStrictEqual(result.userId, valid_user_id);
					done();
				}
			});
		});
		it("shall handle attempting to get user for invalid session id", function(done) {
			User.getUserBySessionId(invalid_session_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "User does not exist for sessionId");
					done();
				}
			});
		});
	});
	context("nullifySessionIdByUserId", function() {
		it("shall set session id to null for valid user", function(done) {
			User.nullifySessionIdByUserId(valid_user_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Successful nullification");
					done();
				}
			});
		});
		it("shall handle attempting to set session id to null for nonexistent user", function(done) {
			User.nullifySessionIdByUserId(invalid_user_id, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "User does not exist for given userId");
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
