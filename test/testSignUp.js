const assert = require("assert");
const SignUp = require("../src/routes/SignUp");
const User = require("../src/routes/User");
const sensitiveInfo = require("../config/SensitiveInfo.json");
const crypto = require("crypto");


// This is testing the SignUp module
describe("SignUp", function() {
	let valid_email = "hithere@email.com";
	let valid_password = "test_password";
	
	// hash user password using AES
	let cipher = crypto.createCipher("aes-256-cbc", sensitiveInfo.aes_key);
	let encrypted_password = cipher.update(valid_password,"utf8","hex");
	encrypted_password += cipher.final("hex");
	
	context("delegate", function() {
		it("shall test delegate for valid user", function (done) {
			SignUp.delegate(valid_email, valid_password, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Successful Sign Up Operation");
					done();
				}
			});
		});
		it("shall test delegate for handling invalid user (where email already exists)", function (done) {
			SignUp.delegate(valid_email, valid_password, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 204);
					assert.deepStrictEqual(result.message, "Conflict - This email is already in use");
					done();
				}
			});
		});
	});
	// Cleaning up
	context("deleteUser", function() {
		it("shall delete test user", function(done) {
			User.deleteUser(valid_email, encrypted_password, function (error, result) {
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