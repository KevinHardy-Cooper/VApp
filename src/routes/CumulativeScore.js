/*
    MOD-008
 */

// Imports
const Score = require("./Score");
const logger = require("../../config/log.js");
const inspect = require("util").inspect;

class CumulativeScore extends Score {
	static calculateCumulativeScore() {
		// Calculates cumulative vulnerability score of all social medias.
	}
}

module.exports = CumulativeScore;