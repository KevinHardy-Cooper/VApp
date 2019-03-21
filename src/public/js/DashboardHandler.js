window.onload = function() {
	$.getJSON("/history/recent/" + getCookie("session_id"), function(data) {
		let cumulativeScore = "Welcome to VApp!";
		let twitterScore = "Log in to get a Grade!";
		let facebookScore = "Log in to get a Grade!";
		let instagramScore = "Log in to get a Grade!";
		for (let i = 0; i < data.length; i++) {
			if (data[i].type_id === 1) {
				let inverseScore = 100 - data[i].score;
				cumulativeScore = convertToGrade(inverseScore);
			} else if (data[i].type_id === 2) {
				let inverseScore = 100 - data[i].score;
				twitterScore = "Most Recent Grade: " + convertToGrade(inverseScore);
			} else if (data[i].type_id === 3) {
				let inverseScore = 100 - data[i].score;
				facebookScore = "Most Recent Grade: " + convertToGrade(inverseScore);
			} else if (data[i].type_id === 4) {
				let inverseScore = 100 - data[i].score;
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