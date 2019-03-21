function processInstagram() {
	// HTML doesn't send the value of unchecked boxes, so in the form we added
	// hidden checkboxes with False values.
	// If the checkbox is checked we don't send the false values.
	if(document.getElementById("accountPrivacy").checked) {
		document.getElementById("accountPrivacyFalse").disabled = true;
	}

	if(document.getElementById("activityStatus").checked) {
		document.getElementById("activityStatusFalse").disabled = true;
	}

	if(document.getElementById("storySharing").checked) {
		document.getElementById("storySharingFalse").disabled = true;
	}
	
	let curForm = $("form#igPrivacyForm").serializeArray();
	let settings = {
		"account_privacy": curForm[0].value,
		"activity_status": curForm[1].value,
		"story_sharing": curForm[2].value,
		"usertag_review": curForm[3].value
	};
	
	$.ajax( "/score/instagram", {
		data : JSON.stringify({ "sessionId":getCookie("session_id"), "settings":settings } ),
		contentType : "application/json",
		type : "POST"}).done(function(response) {
		if (response.code === 200) {
			window.location = "/settings/instagram";
		}
	});
}