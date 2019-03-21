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
		it("shall insert a test user into the database", function (done) {
			User.insertUser(valid_email, encrypted_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "New user inserted");
					done();
				}
			});
		});
	});
	context("delegate", function() {
		it("shall test delegate for valid user", function (done) {
			SignIn.delegate(valid_email, valid_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.code, 200);
					assert.deepStrictEqual(obj.success, "User exists for given email and password");
					assert.deepStrictEqual(typeof obj.cookie, typeof "");
					done();
				}
			});
		});
		it("shall test delegate for handling invalid user", function (done) {
			SignIn.delegate(invalid_email, valid_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 204);
					assert.deepStrictEqual(obj.statusMessage, "User does not exist for given email and password");
					done();
				}
			});
		});
	});
	context("cleanUp", function() {
		it("shall delete test user", function(done) {
			User.deleteUser(valid_email, encrypted_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj, 200);
					done();
				}
			});
		});
	});
});