const assert = require("assert");
const Grade = require("../src/routes/Grade");

// This is testing the Grade module
describe("Grade", function() {
	let valid_high_amount = 99;
	let valid_low_amount = 0;
	context("getGrade", function () {
		it("shall retrieve a grade given valid high amount from the database", function(done) {
			Grade.getGrade(valid_high_amount,function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Grade returned for amount");
					assert.deepStrictEqual(result.grade, "F");
					assert.deepStrictEqual(result.score, 100);
					done();
				}
			});
		});
		it("shall retrieve a grade given valid low amount from the database", function(done) {
			Grade.getGrade(valid_low_amount,function(error, result) {
				if (error) done(error);
				else {
					assert.deepStrictEqual(result.code, 200);
					assert.deepStrictEqual(result.message, "Grade returned for amount");
					assert.deepStrictEqual(result.grade, "A+");
					assert.deepStrictEqual(result.score, 10);
					done();
				}
			});
		});
	});
});