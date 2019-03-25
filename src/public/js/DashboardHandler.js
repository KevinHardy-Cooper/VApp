window.onload = function() {
	$.getJSON("/score/recent/" + getCookie("session_id"), function(data) {
		let cumulativeScore = "Welcome to VApp!";
		let twitterScore = "Log in to get a Grade!";
		let facebookScore = "Log in to get a Grade!";
		let instagramScore = "Log in to get a Grade!";

		let scores = data.scores;
		for (let i = 0; i < scores.length; i++) {
			let score_type = scores[i].type_id;
			let score = scores[i].score;
			if (score_type === 1) {
				let inverseScore = 100 - score;
				cumulativeScore = convertToGrade(inverseScore);
				document.getElementById("privacyGaugeTitle").style.display = "block";
				let g = new JustGage({
					id: "gauge",
					value: inverseScore,
					gaugeWidthScale: 0.4,
					min: 0,
					minTxt: "F",
					max: 100,
					maxTxt: "A+",
					label: "Secure",
					symbol:"%",
					valueMinFontSize: 40,
					labelMinFontSize:15,
					levelColors:["#ff0000", "#f9c802", "#a9d70b"],
					hideMinMax: true,
					counter: true,
					pointer: true
				});
			} else if (score_type === 2) {
				let inverseScore = 100 - score;
				twitterScore = "Most Recent Grade: " + convertToGrade(inverseScore);
			} else if (score_type === 3) {
				let inverseScore = 100 - score;
				facebookScore = "Most Recent Grade: " + convertToGrade(inverseScore);
			} else if (score_type === 4) {
				let inverseScore = 100 - score;
				instagramScore = "Most Recent Grade: " + convertToGrade(inverseScore);
			}
		}
		$("#cumulativeScore").append("<b>" + cumulativeScore + "</b>");
		$("#twitterScore").append("<p>" + twitterScore + "</p>");
		$("#facebookScore").append("<p>" + facebookScore + "</p>");
		$("#instagramScore").append("<p>" + instagramScore + "</p>");
	});
};

function convertToGrade(score) {
	let grade = "F";
	if (score >= 90) {
		grade = "A+";
	} else if (score >= 85) {
		grade = "A";
	} else if (score >= 80) {
		grade = "A-";
	} else if (score >= 75) {
		grade = "B+";
	} else if (score >= 70) {
		grade = "B";
	} else if (score >= 65) {
		grade = "B-";
	} else if (score >= 60) {
		grade = "C+";
	} else if (score >= 55) {
		grade = "C";
	} else if (score >= 50) {
		grade = "C-";
	} else if (score >= 45) {
		grade = "D+";
	} else if (score >= 40) {
		grade = "D";
	} else if (score >= 35) {
		grade = "D-";
	}
	return grade;
}