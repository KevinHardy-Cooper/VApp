const assert = require("assert");
const Implications = require("../src/routes/Implications");

// This is testing the Implications module
describe("Implications", function() {
	let valid_social_media = "twitter";
	let valid_setting_name = "protected";
	let valid_setting_state = "false";
	let invalid_social_media = "not_twitter";
	let invalid_setting_name = "unprotected";
	let invalid_setting_state = "vulnerable";
	context("getImplications", function() {
		it("shall retrieve an implication given social media, setting, and state from the database", function(done) {
			Implications.getImplications(valid_social_media, valid_setting_name, valid_setting_state,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(typeof obj[0].description, typeof "");
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an implication given invalid social media, setting, and state from the database", function(done) {
			Implications.getImplications(invalid_social_media, valid_setting_name, valid_setting_state,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an implication given social media, invalid setting, and state from the database", function(done) {
			Implications.getImplications(valid_social_media, invalid_setting_name, valid_setting_state,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an implication given social media, setting, and invalid state from the database", function(done) {
			Implications.getImplications(valid_social_media, valid_setting_name, invalid_setting_state,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
	});
	context("getInstructions", function() {
		it("shall retrieve an instruction given social media, setting, and state from the database", function(done) {
			Implications.getInstructions(valid_social_media, valid_setting_name, valid_setting_state,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(typeof obj[0].instructions, typeof "");
					done();
				}
			});
		});
		it("shall retrieve null instruction given social media, setting, and state from the database", function(done) {
			Implications.getInstructions(valid_social_media, valid_setting_name, true,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].instructions, null);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an instruction given invalid social media, setting, and state from the database", function(done) {
			Implications.getInstructions(invalid_social_media, valid_setting_name, valid_setting_state,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an instruction given social media, invalid setting, and state from the database", function(done) {
			Implications.getInstructions(valid_social_media, invalid_setting_name, valid_setting_state,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an instruction given social media, setting, and invalid state from the database", function(done) {
			Implications.getInstructions(valid_social_media, valid_setting_name, invalid_setting_state,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj.length, 0);
					done();
				}
			});
		});
	});
});