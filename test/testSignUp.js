const assert = require("assert");
const SignUp = require("../src/routes/SignUp");
const User = require("../src/routes/User");
const sensitiveInfo = require("../config/SensitiveInfo.json");
const crypto = require("crypto");


// This is testing the SignUp module
describe("SignUp", function() {
	let valid_email = "test@email.com";
	let valid_password = "test_password";
	
	// hash user password using AES
	let cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_key);
	let encrypted_password = cipher.update(valid_password,"utf8","hex");
	encrypted_password += cipher.final("hex");
	
	context("delegate", function() {
		it("shall test delegate for valid user", function (done) {
			SignUp.delegate(valid_email, valid_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "New user inserted");
					done();
				}
			});
		});
		it("shall test delegate for handling invalid user (where email already exists)", function (done) {
			SignUp.delegate(valid_email, valid_password, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.code, 204);
					assert.deepStrictEqual(obj.failed, "New user not inserted, user already exists for email");
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