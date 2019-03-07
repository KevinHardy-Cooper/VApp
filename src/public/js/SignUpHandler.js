let form = document.getElementById('signupForm');

if (form.attachEvent) {
	form.attachEvent("submit", processForm);
} else {
	form.addEventListener("submit", processForm);
}

function processForm(e) {
	
	if (e.preventDefault) e.preventDefault();
	
	let email = document.getElementById("inputEmail").value;
	let password = document.getElementById("inputPassword").value;
	
	$.ajax( "/signup", {
		data : JSON.stringify({
			"email": email,
			"password": password
		}),
		contentType : 'application/json',
		type : 'POST'}).done(function( res ) {
		if (res.code === 204) {
			document.getElementById("invalidEmail").innerHTML = "User already exists for that email";
			return false;
		} else {
			window.location = "/signin";
		}
	});
}