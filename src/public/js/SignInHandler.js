let form = document.getElementById('signinForm');

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
		contentType : 'application/json',
		type : 'POST'}).done(function( res ) {
		if (res.code === 200) {
			window.location = "/dashboard";
		} else {
			document.getElementById("invalidCredentials").innerHTML = "Invalid Credentials";
			return false;
		}
	});
}