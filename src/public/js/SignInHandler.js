let url_string = window.location.href;
let url = new URL(url_string);
let account_status = url.searchParams.get("account_status");

if (account_status === "new") {
	document.getElementById("account_success_banner").style.display = "block";
} else {
	document.getElementById("account_success_banner").style.display = "none";
}

let form = document.getElementById("signinForm");

if (form.attachEvent) {
	form.attachEvent("submit", processForm);
} else {
	form.addEventListener("submit", processForm);
}

function processForm(e) {
	
	if (e.preventDefault) e.preventDefault();
	
	let email = document.getElementById("inputEmail").value;
	let password = document.getElementById("inputPassword").value;
	
	$.ajax( "/signin", {
		data : JSON.stringify({
			"email": email,
			"password": password
		}),
		contentType : "application/json",
		type : "POST"}).done(function( res ) {
		if (res.code === 200) {
			setCookie("session_id", res.sessionId, 14); // setting expiry date to 14 days
			window.location = "/dashboard";
		} else {
			document.getElementById("invalidCredentials").innerHTML = "Invalid Credentials";
			return false;
		}
	});
}