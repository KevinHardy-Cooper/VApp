function convertToDeveloperFriendly(userFriendlyName) {
	let developerFriendlyNames = {
		"only me": "only_me",
		"public": "public",
		"everyone": "everyone",
		"friends": "friends",
		"friends of friends": "friends_of_friends",
		"specific friends": "specific_friends",
		"friends except...": "friends_except",
		"custom": "custom",
		"yes": "yes",
		"no": "no"
	};
	let lowerCaseUserFriendlyName = (""+userFriendlyName).toLowerCase();
	if (developerFriendlyNames[lowerCaseUserFriendlyName]) {
		return developerFriendlyNames[lowerCaseUserFriendlyName];
	}
}

function processFacebook() {
	let data = document.getElementById("facebookText").value;
	let splitData = data.split("\n");
	let whoCanSeeYourFuturePostsIndex = splitData.indexOf("Who can see your future posts?");
	let whoCanSeeYourFuturePosts = splitData[whoCanSeeYourFuturePostsIndex+1];
	
	let whoCanSendYouFriendRequestsIndex = splitData.indexOf("Who can send you friend requests?");
	let whoCanSendYouFriendRequests = splitData[whoCanSendYouFriendRequestsIndex+1];
	
	let whoCanSeeYourFriendsListIndex = splitData.indexOf("Who can see your friends list?");
	let whoCanSeeYourFriendsList = "";
	if (splitData[whoCanSeeYourFriendsListIndex+1].indexOf("Remember") >= 0) {
		whoCanSeeYourFriendsList = splitData[whoCanSeeYourFriendsListIndex+2]; // chrome on mac
	} else {
		whoCanSeeYourFriendsList = splitData[whoCanSeeYourFriendsListIndex+1]; // chrome on windows
	}
	
	let whoCanLookYouUpUsingTheEmailAddressYouProvidedIndex = splitData.indexOf("Who can look you up using the email address you provided?");
	let whoCanLookYouUpUsingTheEmailAddressYouProvided = splitData[whoCanLookYouUpUsingTheEmailAddressYouProvidedIndex+1];
	
	let whoCanLookYouUpUsingThePhoneNumberYouProvidedIndex = splitData.indexOf("Who can look you up using the phone number you provided?");
	let whoCanLookYouUpUsingThePhoneNumberYouProvided = splitData[whoCanLookYouUpUsingThePhoneNumberYouProvidedIndex+1];
	
	let doYouWantSearchEnginesOutsideOfFacebookToLinkToYourProfileIndex = splitData.indexOf("Do you want search engines outside of Facebook to link to your profile?");
	let doYouWantSearchEnginesOutsideOfFacebookToLinkToYourProfile = splitData[doYouWantSearchEnginesOutsideOfFacebookToLinkToYourProfileIndex+1];
	
	let settings = {
		"future_posts":	convertToDeveloperFriendly(whoCanSeeYourFuturePosts),
		"friend_requests": convertToDeveloperFriendly(whoCanSendYouFriendRequests),
		"friends_list": convertToDeveloperFriendly(whoCanSeeYourFriendsList),
		"discoverable_by_email": convertToDeveloperFriendly(whoCanLookYouUpUsingTheEmailAddressYouProvided),
		"discoverable_by_phone": convertToDeveloperFriendly(whoCanLookYouUpUsingThePhoneNumberYouProvided),
		"discoverable_by_search_engine": convertToDeveloperFriendly(doYouWantSearchEnginesOutsideOfFacebookToLinkToYourProfile)
	};
	
	$.ajax( "/score/facebook", {
		data : JSON.stringify({ "sessionId":getCookie("session_id"), "settings":settings } ),
		contentType : "application/json",
		type : "POST"}).done(function(response) {
		if (response.code === 200) {
			window.location = "/settings/facebook";
		} else if (response.code === 400) {
			window.location = "/error";
			return;
		} else {
			window.location = "/error";
			return;
		}
	});
}

