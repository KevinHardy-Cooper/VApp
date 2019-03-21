const assert = require("assert");
const User = require("../src/routes/User");
const Score = require("../src/routes/Score");

// This is testing the Score module
describe("Score", function() {
	let valid_user_id = 99;
	let valid_type_id = 2;
	let valid_email = "test@email.com";
	let valid_password = "test_password";
	let valid_score = 99;
	let invalid_user_id = 0;
	let valid_social_media = "twitter";
	let invalid_social_media = "not_twitter";
	context("setUp", function() {
		it("shall insert a test user into the database", function(done) {
			User.insertUser(valid_email, valid_password, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "New user inserted");
					valid_user_id = obj.insertId; // getting the user_id of the newly inserted test user
					done();
				}
			});
		});
	});
	context("insertScore", function() {
		it("shall insert a test score into the database", function(done) {
			Score.insertScore(valid_user_id, valid_type_id, valid_score, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "New score inserted");
					done();
				}
			});
		});
	});
	context("getScoresByUserIdAndScoreType", function() {
		it("shall get test score by user id and score type from the database", function(done) {
			Score.getScoresByUserIdAndScoreType(valid_user_id, valid_type_id, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].user_id, valid_user_id);
					assert.deepStrictEqual(obj[0].type_id, valid_type_id);
					assert.deepStrictEqual(obj[0].score, valid_score);
					done();
				}
			});
		});
		it("shall handle attempting to get test score by non existent user id from the database", function(done) {
			Score.getScoresByUserIdAndScoreType(invalid_user_id, valid_type_id, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
	});
	context("getScoresByUserId", function() {
		it("shall get test score by user id from the database", function(done) {
			Score.getScoresByUserId(valid_user_id, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].user_id, valid_user_id);
					assert.deepStrictEqual(obj[0].score, valid_score);
					done();
				}
			});
		});
		it("shall handle attempting to get test score by non existent user id from the database", function(done) {
			Score.getScoresByUserId(invalid_user_id, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
	});
	context("getScoreTypeBySocialMedia", function() {
		it("shall get test score type by social media from the database", function(done) {
			Score.getScoreTypeBySocialMedia(valid_social_media, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].id, 2);
					done();
				}
			});
		});
		it("shall handle attempting to get score type by non existent social media from the database", function(done) {
			Score.getScoreTypeBySocialMedia(invalid_social_media, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
	});
	context("getMostRecentScoreByUserIdAndScoreType", function() {
		it("shall insert a test score into the database", function(done) {
			Score.insertScore(valid_user_id, valid_type_id, 88, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.statusCode, 200);
					assert.deepStrictEqual(obj.statusMessage, "New score inserted");
					done();
				}
			});
		});
		it("shall get most recent test score by user id and score type from the database", function(done) {
			Score.getMostRecentScoreByUserIdAndScoreType(valid_user_id, valid_type_id, function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].user_id, valid_user_id);
					assert.deepStrictEqual(obj[0].type_id, valid_type_id);
					assert.deepStrictEqual(obj[0].score, 88);
					done();
				}
			});
		});
		it("shall handle attempting to get most recent test score by non existent user id from the database", function(done) {
			Score.getMostRecentScoreByUserIdAndScoreType(invalid_user_id, valid_type_id,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
	});
	context("cleanUp", function() {
		it("shall delete test score", function(done) {
			Score.deleteScore(valid_user_id, function (err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj, 200);
					done();
				}
			});
		});
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