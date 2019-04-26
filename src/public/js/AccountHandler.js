function updateEmail() {
	let email = document.getElementById("email").value;
	let emailReg = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
	if (!emailReg.test(email)) {
		document.getElementById("emailResponseMessage").innerText = "Invalid email";
		return;
	}
	$.ajax( "/update/email", {
		data : JSON.stringify({ "email": email, "sessionId": getCookie("session_id") } ),
		contentType : "application/json",
		type : "POST"}).done(function(response) {
		if (response.code === 200) {
			document.getElementById("emailResponseMessage").innerText = response.message;
		} else if (response.code === 204) {
			document.getElementById("emailResponseMessage").innerText = response.message;
		} else if (response.code === 400) {
			window.location = "/error";
			return;
		} else {
			window.location = "/error";
			return;
		}
	});
}

function updatePassword() {
	let password = document.getElementById("password").value;
	$.ajax( "/update/password", {
		data : JSON.stringify({ "password": password, "sessionId": getCookie("session_id") } ),
		contentType : "application/json",
		type : "POST"}).done(function(response) {
		if (response.code === 200) {
			document.getElementById("passwordResponseMessage").innerText = response.message;
		} else if (response.code === 204) {
			document.getElementById("passwordResponseMessage").innerText = response.message;
		} else if (response.code === 400) {
			window.location = "/error";
			return;
		} else {
			window.location = "/error";
			return;
		}
	});
}

function deleteAccount() {
	$.ajax( "/delete", {
		data : JSON.stringify({ "sessionId": getCookie("session_id") } ),
		contentType : "application/json",
		type : "POST"}).done(function(response) {
		if (response.code === 200) {
			alert("Account deleted");
			window.location = "/";
		} else if (response.code === 400) {
			window.location = "/error";
			return;
		} else {
			window.location = "/error";
			return;
		}
	});
}

// Client-side JavaScript password validation was inspired by https://www.w3schools.com/howto/howto_js_password_validation.asp

let password = document.getElementById("password");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let special = document.getElementById("special");
let length = document.getElementById("length");
let submit = document.getElementById("submit");

// When the user starts to type something inside the password field
password.onkeyup = function() {
	
	// Validate lowercase letters
	let lowerCaseLetters = /[a-z]/g;
	if(password.value.match(lowerCaseLetters)) {
		letter.classList.remove("invalid");
		letter.classList.add("valid");
	} else {
		letter.classList.remove("valid");
		letter.classList.add("invalid");
	}
	
	// Validate capital letters
	let upperCaseLetters = /[A-Z]/g;
	if(password.value.match(upperCaseLetters)) {
		capital.classList.remove("invalid");
		capital.classList.add("valid");
	} else {
		capital.classList.remove("valid");
		capital.classList.add("invalid");
	}
	
	// Validate numbers
	let numbers = /[0-9]/g;
	if(password.value.match(numbers)) {
		number.classList.remove("invalid");
		number.classList.add("valid");
	} else {
		number.classList.remove("valid");
		number.classList.add("invalid");
	}
	
	// Validate special characters
	let specials = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g; // from https://www.owasp.org/index.php/Password_special_characters
	if(password.value.match(specials)) {
		special.classList.remove("invalid");
		special.classList.add("valid");
	} else {
		special.classList.remove("valid");
		special.classList.add("invalid");
	}
	
	// Validate length
	if(password.value.length >= 8) {
		length.classList.remove("invalid");
		length.classList.add("valid");
	} else {
		length.classList.remove("valid");
		length.classList.add("invalid");
	}
	
	// Checking to see if all conditions are met so that the user can submit the form
	if (letter.className === "valid" && capital.className === "valid"
		&& number.className === "valid" && length.className === "valid") {
		submit.disabled = false;
	} else {
		submit.disabled = true;
	}
};