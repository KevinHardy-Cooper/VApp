const assert = require("assert");
const SignOut = require("../src/routes/SignOut");
const User = require("../src/routes/User");

// This is testing the SignOut module
describe("SignOut", function() {
	let valid_email = "test@email.com";
	let valid_password = "test_password";
	let valid_session_id = "test_session_id";
	let invalid_session_id = "not real_session_id";
	
	context("setUp", function() {
		it("shall insert a test user into the database", function (done) {
			User.insertUser(valid_email, valid_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "New user inserted");
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
			SignOut.delegate(valid_session_id, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj, 200);
					done();
				}
			});
		});
		it("shall test delegate for handling invalid session id", function (done) {
			SignOut.delegate(invalid_session_id, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj, 204);
					done();
				}
			});
		});
	});
	context("cleanUp", function() {
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