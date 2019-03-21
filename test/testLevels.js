const assert = require("assert");
const Levels = require("../src/routes/Levels");

// This is testing the Levels module
describe("Levels", function() {
	let valid_high_amount = 99;
	let valid_low_amount = 0;
	context("getLevel", function () {
		it("shall retrieve an implication given valid high amount from the database", function(done) {
			Levels.getLevel(valid_high_amount,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].name, "F");
					done();
				}
			});
		});
		it("shall retrieve an implication given valid low amount from the database", function(done) {
			Levels.getLevel(valid_low_amount,function(err, obj) {
				if (err) done(err);
				else {
					assert.deepStrictEqual(obj[0].name, "A+");
					done();
				}
			});
		});
	});
});