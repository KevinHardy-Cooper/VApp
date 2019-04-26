function delegate() {
	let url_string = window.location.href;
	let url = new URL(url_string);
	let whereto = url.searchParams.get("whereto");
	
	let endpoint = "/user/tweets/-1";
	
	if (whereto === "next") {
		let lowestId = getCookie("lowest_id");
		endpoint =  "/user/tweets/" + lowestId;
	} else {
		clearCookie("lowest_id");
	}

	$.getJSON(endpoint, function(data) { // retrieve user tweets
		if (data.length === 0) {
			document.getElementById("pagination").style.display = "none";
			document.getElementById("fyi").innerHTML = "<p>No more tweets to be analyzed</p>";
		}
		let container = document.getElementById("cards");
		let lowestId = getCookie("lowest_id");
		if (lowestId === "null") {
			lowestId = "999999999999999999";
		}
		
		let count = 0; // used to count if none of the tweets returned in the page contain PII
		for (let i = 0; i < data.length; i++) {
			let tweet = data[i];
			if (tweet.id_str < lowestId) {
				lowestId = tweet.id_str - 1000; // to avoid duplicates https://developer.twitter.com/en/docs/tweets/timelines/guides/working-with-timelines
				setCookie("lowest_id", lowestId, 14);
			}
			let whatsWrong = piiParser(tweet.text);
			if (whatsWrong.length > 0) {
				let cardDiv = document.createElement("div");
				cardDiv.className = "card";
				cardDiv.style.margin = "30px";
				let cardHeaderDiv = document.createElement("div");
				cardHeaderDiv.className = "card-header";
				cardHeaderDiv.id = "setting-" + i;
				let valueSpan = document.createElement("span");
				valueSpan.className = "value";
				valueSpan.innerHTML = "<strong><a target='_blank' rel='noopener noreferrer' href='https://twitter.com/" + data[i].user.screen_name + "/status/" + data[i].id_str + "'>Tweet Link</a></strong>";
				cardHeaderDiv.appendChild(valueSpan);
				cardDiv.appendChild(cardHeaderDiv);
				let cardBodyDiv = document.createElement("div");
				cardBodyDiv.className = "card-body";
				let tweetContent = document.createElement("h5");
				tweetContent.className = "text-center";
				tweetContent.innerHTML = "<u>Content</u>";
				cardBodyDiv.appendChild(tweetContent);
				let cardTextImp = document.createElement("p");
				cardTextImp.className = "card-text";
				cardTextImp.innerHTML = "<p>" + data[i].text + "</p>";
				cardBodyDiv.appendChild(cardTextImp);
				let howToFixHeader = document.createElement("h5");
				howToFixHeader.className = "text-center";
				howToFixHeader.id = "setting-" + i + "-fix-header";
				howToFixHeader.innerHTML = "<u>What's wrong with this?</u>";
				cardBodyDiv.appendChild(howToFixHeader);
				let cardTextInstr = document.createElement("p");
				cardTextInstr.className = "card-text";
				let bulletPoints = "<ul>";
				for (let j = 0; j < whatsWrong.length; j++) {
					bulletPoints = bulletPoints + "<li>" + whatsWrong[j] + "</li>";
				}
				bulletPoints = bulletPoints + "</ul>";
				cardTextInstr.innerHTML = bulletPoints;
				cardBodyDiv.appendChild(cardTextInstr);
				cardDiv.appendChild(cardBodyDiv);
				container.appendChild(cardDiv);
			} else {
				count++;
			}
		}
		if (count === data.length && data.length !== 0) {
			document.getElementById("fyi").innerHTML = "<p>No tweets on this page contain PII!</p>";
		}
	});
}

// Starting to work in all of these PII types into the parser
// https://safecomputing.umich.edu/dataguide/?q=node/89
function piiParser(tweetContent) {
	let matchArray = [];
	
	let telephone = /1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?/;
	if (telephone.test(tweetContent)) {
		matchArray.push("Tweet contains a telephone number");
	}
	
	let email = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
	if (email.test(tweetContent)) {
		matchArray.push("Tweet contains an email address");
	}
	
	let date = /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/;
	if (date.test(tweetContent)) {
		matchArray.push("Tweet contains a potential significant date");
	}
	
	let ipv4 = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
	if (ipv4.test(tweetContent)) {
		matchArray.push("Tweet contains an IP address");
	}
	return matchArray;
}