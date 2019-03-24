function chartDataParser(data) {
	let datasets = [{data: []}, {data: []}, {data: []}, {data: []}, {data: []}]; // length of 5 being set for the number of score types that we will support
	for (let i = 0; i < data.length; i++) {
		let score = data[i];
		datasets[score.type_id].data.push({x: score.time, y: 100-score.score});
	}
	return datasets;
}

function assignScoreType(scoreTypeId) {
	if (scoreTypeId === 1) {
		return "Cumulative Score";
	} else if (scoreTypeId === 2) {
		return "Twitter";
	} else if (scoreTypeId === 3) {
		return "Facebook";
	} else if (scoreTypeId === 4) {
		return "Instagram";
	} else {
		return "DNE";
	}
}

function assignLineColour(scoreTypeId) {
	if (scoreTypeId === 1) { // Cumulative Score (Red)
		return { backgroundColor: "rgb(142,68,172)", borderColor: "rgb(142,68,172)" };
	} else if (scoreTypeId === 2) { // Twitter (twitter icon blue)
		return { backgroundColor: "rgb(29,161,242)", borderColor: "rgb(29,161,242)" };
	} else if (scoreTypeId === 3) { // Facebook (facebook logo blue)
		return { backgroundColor: "rgb(60,92,169)", borderColor: "rgb(60,92,169)" };
	} else if (scoreTypeId === 4) { // Instagram (instagram logo reddy-purple)
		return { backgroundColor: "rgb(158,71,108)", borderColor: "rgb(158,71,108)" };
	}
}

function buildGraphConfig(datasets) {
	let yLabels = {
		100: "A+",
		89: "A  ",
		84: "A- ",
		79: "B+",
		74: "B  ",
		69: "B- ",
		64: "C+",
		59: "C  ",
		54: "C- ",
		49: "D+",
		44: "D  ",
		39: "D- ",
		34: "F  "
	};
	let config = {
		type: "line",
		data: {
			datasets: datasets
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: "Grade History",
				fontSize: 32
			},
			tooltips: {
				mode: "index",
				intersect: true
			},
			hover: {
				mode: "nearest",
				intersect: false
			},
			legend: {
				labels: {
					fontSize: 18
				}
			},
			scales: {
				xAxes: [{
					display: true,
					type: "time",
					fontSize: 32,
					scaleLabel: {
						display: true,
						labelString: "Time"
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: "Grade"
					},
					ticks: {
						suggestedMin: 34,
						suggestedMax: 100,
						stepSize: 1,
						callback: function(value) {
							return yLabels[value];
						}
					}
				}]
			}
		}
	};
	return config;
}

function populateTable(data) {
	let table = document.getElementById("scoreTable");
	for (let i = 0; i < data.length; i++) {
		let row = table.insertRow(i+1);
		let num = row.insertCell(0);
		let date = row.insertCell(1);
		let socialMedia = row.insertCell(2);
		let grade = row.insertCell(3);
		num.innerHTML = i;
		date.innerHTML = data[i].time;
		socialMedia.innerHTML = assignScoreType(data[i].type_id);
		grade.innerHTML = 100-data[i].score;
	}
}

window.onload = function() {
	$.getJSON("/score/all/"+getCookie("session_id"), function(data) { // retrieve user settings
		let scores = data.scores;
		populateTable(scores);
		let datasets = chartDataParser(scores);
		for (let i = 0; i < datasets.length; i++) {
			datasets[i].label = assignScoreType(i);
			datasets[i].fill = false;
			datasets[i].tension = 0;
			let colours = assignLineColour(i);
			if (colours) {
				datasets[i].backgroundColor = colours.backgroundColor;
				datasets[i].borderColor = colours.borderColor;
			}
		}
		let usableDatasets = datasets.filter(a => a.data.length !== 0);
		let config = buildGraphConfig(usableDatasets);
		let ctx = document.getElementById("scoreChart").getContext("2d");
		window.myLine = new Chart(ctx, config);
	});
};