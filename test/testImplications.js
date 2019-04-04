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
	context("getImplications", function () {
		it("shall retrieve an implication given social media, setting, and state from the database", function (done) {
			Implications.getImplications(valid_social_media, valid_setting_name, valid_setting_state, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Implications for Social Media, Setting and Setting State combination");
					assert.deepStrictEqual(typeof result.implications, typeof "");
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an implication given invalid social media, setting, and state from the database", function (done) {
			Implications.getImplications(invalid_social_media, valid_setting_name, valid_setting_state, function (error, result) {
				if (error) {
					assert.deepStrictEqual(error.code, 415);
					assert.deepStrictEqual(error.message, "Invalid Setting Name/Invalid Setting Name/Invalid Setting State social media type");
					done();
				} else {
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an implication given social media, invalid setting, and state from the database", function (done) {
			Implications.getImplications(valid_social_media, invalid_setting_name, valid_setting_state, function (error, result) {
				if (error) {
					assert.deepStrictEqual(error.code, 415);
					assert.deepStrictEqual(error.message, "Invalid Setting Name/Invalid Setting Name/Invalid Setting State social media type");
					done();
				} else {
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an implication given social media, setting, and invalid state from the database", function (done) {
			Implications.getImplications(valid_social_media, valid_setting_name, invalid_setting_state, function (error, result) {
				if (error) {
					assert.deepStrictEqual(error.code, 415);
					assert.deepStrictEqual(error.message, "Invalid Setting Name/Invalid Setting Name/Invalid Setting State social media type");
					done();
				} else {
					done();
				}
			});
		});
	});
	context("getInstructions", function () {
		it("shall retrieve an instruction given social media, setting, and state from the database", function (done) {
			Implications.getInstructions(valid_social_media, valid_setting_name, valid_setting_state, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Instructions for Social Media, Setting and Setting State combination");
					assert.deepStrictEqual(typeof result.instructions, typeof "");
					done();
				}
			});
		});
		it("shall retrieve null instruction given social media, setting, and state from the database", function (done) {
			Implications.getInstructions(valid_social_media, valid_setting_name, true, function (error, result) {
				if (error) {
					assert.deepStrictEqual(error.code, 415);
					assert.deepStrictEqual(error.message, "Invalid Setting Name/Invalid Setting Name/Invalid Setting State social media type");
					done();
				} else {
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an instruction given invalid social media, setting, and state from the database", function (done) {
			Implications.getInstructions(invalid_social_media, valid_setting_name, valid_setting_state, function (error, result) {
				if (error) {
					assert.deepStrictEqual(error.code, 415);
					assert.deepStrictEqual(error.message, "Invalid Setting Name/Invalid Setting Name/Invalid Setting State social media type");
					done();
				} else {
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an instruction given social media, invalid setting, and state from the database", function (done) {
			Implications.getInstructions(valid_social_media, invalid_setting_name, valid_setting_state, function (error, result) {
				if (error) {
					assert.deepStrictEqual(error.code, 415);
					assert.deepStrictEqual(error.message, "Invalid Setting Name/Invalid Setting Name/Invalid Setting State social media type");
					done();
				} else {
					done();
				}
			});
		});
		it("shall handle the attempt to retrieve an instruction given social media, setting, and invalid state from the database", function (done) {
			Implications.getInstructions(valid_social_media, valid_setting_name, invalid_setting_state, function (error, result) {
				if (error) {
					assert.deepStrictEqual(error.code, 415);
					assert.deepStrictEqual(error.message, "Invalid Setting Name/Invalid Setting Name/Invalid Setting State social media type");
					done();
				} else {
					done();
				}
			});
		});
	});
	context("getAllWeightsForSetting", function () {
		it("shall retrieve all weights given social media and setting from the database", function (done) {
			Implications.getAllWeightsForSetting(valid_social_media, valid_setting_name, function (error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "All implication weights for a setting");
					assert.deepStrictEqual(result.weights[0].state, "true");
					assert.deepStrictEqual(result.weights[0].weight, 0);
					assert.deepStrictEqual(result.weights[1].state, "false");
					assert.deepStrictEqual(result.weights[1].weight, 10);
					done();
				}
			});
		});
		it("shall handle attempting to retrieve all weights given invalid social media and setting from the database", function (done) {
			Implications.getAllWeightsForSetting(invalid_social_media, valid_setting_name, function (error, result) {
				if (error) {
					assert.deepStrictEqual(error.code, 415);
					assert.deepStrictEqual(error.message, "Invalid Social Media/Invalid Setting Name");
					done();
				} else {
					done();
				}
			});
		});
		it("shall handle attempting to retrieve all weights given invalid social media and setting from the database", function (done) {
			Implications.getAllWeightsForSetting(valid_social_media, invalid_setting_name, function (error, result) {
				if (error) {
					assert.deepStrictEqual(error.code, 415);
					assert.deepStrictEqual(error.message, "Invalid Social Media/Invalid Setting Name");
					done();
				} else {
					done();
				}
			});
		});
	});
});