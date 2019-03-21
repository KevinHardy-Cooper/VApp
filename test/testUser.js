const assert = require("assert");
const User = require("../src/routes/User");

// This is testing the User module
describe("User", function() {
	let valid_email = "test@email.com";
	let valid_password = "test_password";
	let invalid_email = "imnotreal@email.com";
	let valid_session_id = "test_session_id";
	let invalid_session_id = "not_real_session_id";
    
	context("insertUser", function() {
		it("shall insert a test user into the database", function(done) {
			User.insertUser(valid_email, valid_password, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "New user inserted");
					done();
				}
			});
		});
	});
	context("getUserByEmail", function() {
		it("shall get the test user by email from the database", function(done) {
			User.getUserByEmail(valid_email, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj[0].email, valid_email);
					assert.deepStrictEqual(obj[0].password, valid_password);
					assert.deepStrictEqual(obj[0].session_id, null);
					done();
				}
			});
		});
		it("shall handle attempting to retrieve nonexistent user by email from the database", function(done) {
			User.getUserByEmail(invalid_email, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 204);
					assert.deepStrictEqual(obj.statusMessage, "User does not exist for email");
					done();
				}
			});
		});
	});
	context("getUser", function() {
		it("shall get the test user by email and password from the database", function (done) {
			User.getUser(valid_email, valid_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "User exists for given email and password");
					done();
				}
			});
		});
		it("shall handle attempting to retrieve nonexistent user by email and password from the database", function (done) {
			User.getUser(invalid_email, valid_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 204);
					assert.deepStrictEqual(obj.statusMessage, "User does not exist for given email and password");
					done();
				}
			});
		});
	});
	context("setSessionId", function() {
		it("shall set session id for valid user", function(done) {
			User.setSessionId(valid_email, valid_password, valid_session_id, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, valid_session_id);
					done();
				}
			});
		});
		it("shall handle attempting to set session id for nonexistent user", function(done) {
			User.setSessionId(invalid_email, valid_password, valid_session_id, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 204);
					assert.deepStrictEqual(obj.statusMessage, "User does not exist for given email and password");
					done();
				}
			});
		});
	});
	context("getUserBySessionId", function() {
		it("shall get user for valid session id", function(done) {
			User.getUserBySessionId(valid_session_id, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].email, valid_email);
					assert.deepStrictEqual(obj[0].password, valid_password);
					assert.deepStrictEqual(obj[0].session_id, valid_session_id);
					done();
				}
			});
		});
		it("shall handle attempting to get user for invalid session id", function(done) {
			User.getUserBySessionId(invalid_session_id, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 204);
					assert.deepStrictEqual(obj.statusMessage, "User does not exist for session_id");
					done();
				}
			});
		});
	});
	context("nullifySessionId", function() {
		it("shall set session id to null for valid user", function(done) {
			User.nullifySessionId(valid_email, valid_password, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "Successful nullification");
					done();
				}
			});
		});
		it("shall handle attempting to set session id to null for nonexistent user", function(done) {
			User.nullifySessionId(invalid_email, valid_password, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 204);
					assert.deepStrictEqual(obj.statusMessage, "User does not exist");
					done();
				}
			});
		});
	});
	// Cleaning up
	context("deleteUser", function() {
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
