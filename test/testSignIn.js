const assert = require("assert");
const SignIn = require("../src/routes/SignIn");
const User = require("../src/routes/User");
const crypto = require("crypto");
const sensitiveInfo = require("../config/SensitiveInfo.json");

// This is testing the SignIn module
describe("SignIn", function() {
	let valid_email = "test@email.com";
	let valid_password = "test_password";
	let invalid_email = "imnotreal@email.com";
	
	// hash user password using AES
	let cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_key);
	let encrypted_password = cipher.update(valid_password,"utf8","hex");
	encrypted_password += cipher.final("hex");

	context("setUp", function() {
		it("shall insert a test user into the database", function(done) {
			User.insertUser(valid_email, encrypted_password, function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "New user inserted");
					done();
				}
			});
		});
	});
	context("delegate", function() {
		it("shall test delegate for valid user", function (done) {
			SignIn.delegate(valid_email, valid_password, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Successful Sign In Operation");
					assert.deepStrictEqual(typeof result.sessionId, typeof "");
					done();
				}
			});
		});
		it("shall test delegate for handling invalid user", function (done) {
			SignIn.delegate(invalid_email, valid_password, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "User does not exist for given email and password in SignIn");
					done();
				}
			});
		});
	});
	// Cleaning up
	context("deleteUser", function() {
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