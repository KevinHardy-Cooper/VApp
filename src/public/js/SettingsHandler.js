function delegate() {
	let settings =  ["discoverable_by_email","geo_enabled", "protected"];
	let friendly_setting_names = {
		"discoverable_by_email" : "Let others find you by your email address",
		"geo_enabled" : "Tweet with a location (website), Precise Location (mobile app)",
		"protected" : "Protect your tweets from the public"
	};
	$.getJSON("/settings/twitter", function(data) { // retrieve user settings
		for (var i = 0; i < settings.length; i++){
			$("#setting-" + i + " > span").append(friendly_setting_names[settings[i]] + ": <strong>"+ data[settings[i]] + "</strong>");
		}
	}).done(function( data ) {
		$.ajax( "/score/twitter", {
			data : JSON.stringify({ "sessionId":getCookie("session_id"), "settings":data } ),
			contentType : "application/json",
			type : "POST"}).done(function( score ) {
			$.getJSON("/level/" + getCookie("session_id") + "/twitter", function(level) {
				$("body > div > div.text-center > h1 > span").append("<strong>"+ level[0].name + "</strong>");
			});
		});
		for (var i = 0; i < settings.length; i++){
			generateSettingsBody("setting-" + i + "-imp", "implications", settings[i] ,data[settings[i]]);
		}
		
		for (var j = 0; j < settings.length; j++){
			generateSettingsBody("setting-" + j + "-fix", "instructions", settings[j] ,data[settings[j]]);
		}
	});
	
	function generateSettingsBody(id, type, setting, value) {
		let link = "/"+ type +"/twitter/"+setting+"/"+ value;
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