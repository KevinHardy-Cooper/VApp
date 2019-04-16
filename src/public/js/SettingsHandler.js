function convertToUserFriendly(developerFriendlyName) {
	let userFriendlyNames = {
		"only_me": "Only Me",
		"public": "Public",
		"everyone": "Everyone",
		"friends": "Friends",
		"friends_of_friends": "Friends of Friends",
		"specific_friends": "Specific Friends",
		"friends_except": "Friends Except...",
		"custom": "Custom",
		"yes": "Yes",
		"no": "No",
		"true": "True",
		"false": "False",
		"manual": "Manual",
		"automatic": "Automatic",
		"following": "Following",
		"all": "All"
	};
	let lowerCaseDeveloperFriendlyName = (""+developerFriendlyName).toLowerCase();
	if (userFriendlyNames[lowerCaseDeveloperFriendlyName]) {
		return userFriendlyNames[lowerCaseDeveloperFriendlyName];
	}
}

function delegate() {
	// grabbing the type of settings page ie either facebook, twitter, etc
	let socialMedia = location.pathname.match(/\/settings\/(.*)/)[1];
	let titleCaseSocialMediaName = socialMedia.charAt(0).toUpperCase() + socialMedia.substring(1, socialMedia.length);
	let settings = [];
	let friendly_setting_names = [];
	// Getting the link for social media privacy pages
	let socialMediaPrivacyPage = "";
	if (socialMedia === "twitter") {
		$("body > div > div.text-center > h1").prepend("Twitter: ");
		settings =  ["discoverable_by_email","geo_enabled", "protected", "use_cookie_personalization", "allow_dms_from"];
		friendly_setting_names = {
			"discoverable_by_email" : "Let others find you by your email address",
			"geo_enabled" : "Tweet with a location (website), Precise location (mobile app)",
			"protected" : "Protect your tweets from the public",
			"use_cookie_personalization" : "Track where you see Twitter content across the web",
			"allow_dms_from" : "Receive direct messages from anyone (website), Receive message requests (mobile app)"
		};
		socialMediaPrivacyPage = "https://twitter.com/settings/safety";
	} else if (socialMedia === "facebook") {
		$("body > div > div.text-center > h1").prepend("Facebook: ");
		settings =  ["future_posts","friend_requests", "friends_list", "discoverable_by_email",
			"discoverable_by_phone", "discoverable_by_search_engine"];
		friendly_setting_names = {
			"future_posts" : "Who can see your future posts",
			"friend_requests" : "Who can send you friend requests",
			"friends_list" : "Who can see your friends list",
			"discoverable_by_email" : "Who can look you up using the email address you provided",
			"discoverable_by_phone" : "Who can look you up using the phone number you provided",
			"discoverable_by_search_engine" : "Do you want search engines outside of Facebook to link to your profile"
		};
		socialMediaPrivacyPage = "https://www.facebook.com/settings?tab=privacy";
	} else if (socialMedia === "instagram") {
		$("body > div > div.text-center > h1").prepend("Instagram: ");
		settings = ["account_privacy", "activity_status", "story_sharing", "usertag_review"];

		friendly_setting_names = {
			"account_privacy" : "Make account private",
			"activity_status" : "Show activity status",
			"story_sharing" : "Allow sharing of story photos and videos",
			"usertag_review" : "Add tagged photos and videos to your profile automatically"
		};
		socialMediaPrivacyPage = "https://www.instagram.com/accounts/privacy_and_security/";
	} else {
		$("body > div > div.text-center > h1").prepend("DNE: ");
	}
	$.getJSON("/user/settings/" + socialMedia, function(data) { // retrieve user settings
		if (data.code === 415) {
			window.location = "/error";
			return;
		}
		
		// Dynamically build setting cards
		/*<div class="card" style="margin: 30px">
			<div class="card-header text-white bg-primary" id="setting-0" ><span class="value"></span></div>
			<div class="card-body">
				<h5 class="text-center"><u>Implications</u></h5>
				<p class="card-text" id="setting-0-imp"></p>
				<h5 class="text-center" id="setting-0-fix-header"><u>How to Fix</u></h5>
				<p class="card-text" id="setting-0-fix"></p>
			</div>
		</div>*/
		
		// Added View Social Media Settings Link
		$("#socialMedia-link").attr("href", socialMediaPrivacyPage);
		$("#socialMedia-link").attr("target", "blank");
		$("#socialMedia-link").attr("rel", "noopener noreferrer");
		$("#socialMedia-link").append("Visit "+titleCaseSocialMediaName+" Settings Page");
		let container = document.getElementById("cards");
		for (let i = 0; i < settings.length; i++) {
			let cardDiv = document.createElement("div");
			cardDiv.className = "card";
			cardDiv.style.margin = "30px";
			let cardHeaderDiv = document.createElement("div");
			cardHeaderDiv.className = "card-header";
			cardHeaderDiv.id = "setting-" + i;
			let valueSpan = document.createElement("span");
			valueSpan.className = "value";
			valueSpan.innerHTML = friendly_setting_names[settings[i]] + ": <strong>"+ convertToUserFriendly(data[settings[i]]) + "</strong>";
			cardHeaderDiv.appendChild(valueSpan);
			let updateSettingButton = document.createElement("span");
			updateSettingButton.className = "badge badge-dark float-right";
			updateSettingButton.innerHTML = "<a target='_blank' rel='noopener noreferrer' style='color: #fff' href=" + socialMediaPrivacyPage + ">Update Setting</a>";
			cardHeaderDiv.appendChild(updateSettingButton);
			cardDiv.appendChild(cardHeaderDiv);
			let cardBodyDiv = document.createElement("div");
			cardBodyDiv.className = "card-body";
			let implicationHeader = document.createElement("h5");
			implicationHeader.className = "text-center";
			implicationHeader.innerHTML = "<u>Implications</u>";
			cardBodyDiv.appendChild(implicationHeader);
			let cardTextImp = document.createElement("p");
			cardTextImp.className = "card-text";
			cardTextImp.id = "setting-" + i + "-imp";
			cardBodyDiv.appendChild(cardTextImp);
			let howToFixHeader = document.createElement("h5");
			howToFixHeader.className = "text-center";
			howToFixHeader.id = "setting-" + i + "-fix-header";
			howToFixHeader.innerHTML = "<u>How To Fix</u>";
			cardBodyDiv.appendChild(howToFixHeader);
			let cardTextInstr = document.createElement("p");
			cardTextInstr.className = "card-text";
			cardTextInstr.id = "setting-" + i + "-fix";
			cardBodyDiv.appendChild(cardTextInstr);
			cardDiv.appendChild(cardBodyDiv);
			container.appendChild(cardDiv);
		}
	}).done(function(data) {
		if (data.code === 200 && (data.socialMedia === "facebook" || data.socialMedia === "instagram")) { // facebook and instagram flow
			$.getJSON("/grade/" + getCookie("session_id") + "/" + socialMedia, function (grade) {
				if (grade.code === 200) {
					$("body > div > div.text-center > h1 > span").append("<strong>" + grade.grade + "</strong>");
					getGauge(grade.score, titleCaseSocialMediaName); // Create gauge
				} else {
					window.location = "/error";
					return;
				}
			});
		}  else if (data.code === 200 && data.socialMedia === "twitter") { // twitter flow
			$.ajax("/score/" + socialMedia, {
				data: JSON.stringify({"sessionId": getCookie("session_id"), "settings": data}),
				contentType: "application/json",
				type: "POST"
			}).done(function (data) {
				if (data.code === 400) {
					window.location = "/error";
					return;
				} else {
					$.getJSON("/grade/" + getCookie("session_id") + "/" + socialMedia, function (grade) {
						if (grade.code === 200) {
							$("body > div > div.text-center > h1 > span").append("<strong>" + grade.grade + "</strong>");
							getGauge(grade.score, titleCaseSocialMediaName);// Create gauge
						} else {
							window.location = "/error";
							return;
						}
					});
				}
			});
		}
		for (let i = 0; i < settings.length; i++){
			generateSettingsBody("setting-" + i + "-imp", "implications", settings[i] ,data[settings[i]]);
			generateSettingsBody("setting-" + i + "-fix", "instructions", settings[i] ,data[settings[i]]);
			changeCardColor(i, settings[i], data[settings[i]]);
		}
	});

	function generateSettingsBody(id, type, setting, value) {
		let link = "/"+ type +"/" + socialMedia + "/"+setting+"/"+ value;
		$.getJSON(link, function(data) { // retrieve user settings
			if (data.code === 415 || data.code === 400) {
				window.location = "/error";
				return;
			}
			let implications = data.implications;
			let instructions = data.instructions;
			if(type === "implications"){
				$("#"+id).append("<strong>"+ implications + "</strong>");
				$("#"+id).css("white-space","pre-wrap");
			} else if (type === "instructions" && instructions !== null){
				$("#"+id).append("<strong>"+ instructions + "</strong>");
				$("#"+id).css("white-space","pre-wrap");
			} else if (type === "instructions" && instructions === null) {
				// if the correct setting state is achieved, instructions to fix are null, so hide this section
				document.getElementById(id).style.display = "none";
				document.getElementById(id+"-header").style.display = "none";
			}
		});
	}

	function changeCardColor(id, setting, value) {
		$.getJSON("/implicationWeights/" + socialMedia + "/" + setting, function (response) {
			if (response.code === 415 || response.code === 400) {
				window.location = "/error";
				return;
			}
			let max = 0;
			let min = Number.MAX_SAFE_INTEGER;
			let weights = response.weights;
			for (let i = 0; i < weights.length; i++) {
				if (weights[i].weight > max) {
					max = weights[i].weight;
				}
				if (weights[i].weight < min) {
					min = weights[i].weight;
				}
			}

			for (let i = 0; i < weights.length; i++) {
				if (weights[i].state.toString().toLowerCase() === value.toString().toLowerCase() && weights[i].weight === max) {
					$("#setting-" + id).addClass("text-white bg-danger");
				} else if (weights[i].state.toString().toLowerCase() === value.toString().toLowerCase() && weights[i].weight === min) {
					$("#setting-" + id).addClass("text-white bg-success");
					$("#setting-" + id +" > span.badge.badge-dark.float-right").remove();
				} else if (weights[i].state.toString().toLowerCase() === value.toString().toLowerCase() && weights[i].weight !== min && weights[i].weight !== max) {
					$("#setting-" + id).addClass("bg-warning");
				}
			}
		});
	}

	 function getGauge(score, socialMedia){
		 let inverseScore = 100 - score;
		 let g = new JustGage({
			 id: "gauge",
			 value: inverseScore,
			 gaugeWidthScale: 0.4,
			 min: 0,
			 minTxt: "F",
			 max: 100,
			 maxTxt: "A+",
			 label: "Secure on "+ socialMedia,
			 symbol:"%",
			 valueMinFontSize: 40,
			 labelMinFontSize:15,
			 levelColors:["#ff0000", "#f9c802", "#a9d70b"],
			 hideMinMax: true,
			 counter: true,
			 pointer: true
		 });
	 }
}