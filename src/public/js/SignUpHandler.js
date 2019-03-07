let form = document.getElementById("signupForm");

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
		contentType : "application/json",
		type : "POST"}).done(function( res ) {
		if (res.code === 204) {
			document.getElementById("invalidEmail").innerHTML = "User already exists for that email";
			return false;
		} else {
			window.location = "/signin";
		}
	});
}

// Client-side JavaScript password validation was inspired by https://www.w3schools.com/howto/howto_js_password_validation.asp

let password = document.getElementById("inputPassword");
let confirm = document.getElementById("inputConfirmPassword");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let special = document.getElementById("special");
let length = document.getElementById("length");
let match = document.getElementById("match");
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
	
	if (password.value.length > 0 && confirm.value.length > 0) {
		// Validate if passwords match
		if (password.value === confirm.value) {
			match.classList.remove("invalid");
			match.classList.add("valid");
		} else {
			match.classList.remove("valid");
			match.classList.add("invalid");
		}
	} else {
		match.classList.remove("valid");
		match.classList.add("invalid");
	}
	
	// Checking to see if all conditions are met so that the user can submit the form
	if (letter.className === "valid" && capital.className === "valid"
		&& number.className === "valid" && length.className === "valid"
		&& match.className === "valid") {
		submit.disabled = false;
	} else {
		submit.disabled = true;
	}
};

// When the user starts to type something inside the confirm password field
confirm.onkeyup = function() {
	if (password.value.length > 0 && confirm.value.length > 0) {
		// Validate if passwords match
		if (password.value === confirm.value) {
			match.classList.remove("invalid");
			match.classList.add("valid");
		} else {
			match.classList.remove("valid");
			match.classList.add("invalid");
		}
	} else {
		match.classList.remove("valid");
		match.classList.add("invalid");
	}
	
	// Checking to see if all conditions are met so that the user can submit the form
	if (letter.className === "valid" && capital.className === "valid"
		&& number.className === "valid" && length.className === "valid"
		&& match.className === "valid") {
		submit.disabled = false;
	} else {
		submit.disabled = true;
	}
};