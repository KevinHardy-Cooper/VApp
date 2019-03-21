function delegate() {
	// grabbing the type of settings page ie either facebook, twitter, etc
	let socialMedia = location.pathname.match(/\/settings\/(.*)/)[1];
	let settings = [];
	let friendly_setting_names = [];
	if (socialMedia === "twitter") {
		$("body > div > div.text-center > h1").prepend("Twitter: ");
		settings =  ["discoverable_by_email","geo_enabled", "protected", "use_cookie_personalization", "allow_dms_from"];
		friendly_setting_names = {
			"discoverable_by_email" : "Let others find you by your email address",
			"geo_enabled" : "Tweet with a location (website), Precise Location (mobile app)",
			"protected" : "Protect your tweets from the public",
			"use_cookie_personalization" : "Track where you see Twitter content across the web",
			"allow_dms_from" : "Receive Direct Messages from anyone (website), Receive message requests (mobile app)"
		};
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
	} else {
		$("body > div > div.text-center > h1").prepend("DNE: ");
	}
	$.getJSON("/user/settings/" + socialMedia, function(data) { // retrieve user settings
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
		let container = document.getElementById("cards");
		for (let i = 0; i < settings.length; i++) {
			let cardDiv = document.createElement("div");
			cardDiv.className = "card";
			cardDiv.style.margin = "30px";
			let cardHeaderDiv = document.createElement("div");
			cardHeaderDiv.className = "card-header text-white bg-primary";
			cardHeaderDiv.id = "setting-" + i;
			let valueSpan = document.createElement("span");
			valueSpan.className = "value";
			valueSpan.innerHTML = friendly_setting_names[settings[i]] + ": <strong>"+ data[settings[i]] + "</strong>";
			cardHeaderDiv.appendChild(valueSpan);
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
		if (data.code && data.code === 200) { // facebook flow
			$.getJSON("/level/" + getCookie("session_id") + "/" + socialMedia, function (level) {
				$("body > div > div.text-center > h1 > span").append("<strong>" + level[0].name + "</strong>");
			});
		} else if (!data.code) { // twitter flow
			$.ajax("/score/" + socialMedia, {
				data: JSON.stringify({"sessionId": getCookie("session_id"), "settings": data}),
				contentType: "application/json",
				type: "POST"
			}).done(function () {
				$.getJSON("/level/" + getCookie("session_id") + "/" + socialMedia, function (level) {
					$("body > div > div.text-center > h1 > span").append("<strong>" + level[0].name + "</strong>");
				});
			});
		} else {
			console.log("Social Media not supported");
			return;
		}
		for (var i = 0; i < settings.length; i++){
			generateSettingsBody("setting-" + i + "-imp", "implications", settings[i] ,data[settings[i]]);
			generateSettingsBody("setting-" + i + "-fix", "instructions", settings[i] ,data[settings[i]]);
		}
	});
	
	function generateSettingsBody(id, type, setting, value) {
		let link = "/"+ type +"/" + socialMedia + "/"+setting+"/"+ value;
		$.getJSON(link, function(data) { // retrieve user settings
			let implications = data[0].description;
			let instructions = data[0].instructions;
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
	
}