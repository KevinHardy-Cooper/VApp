// SignOut functionality
$("#signout").click(function(){ signout(); return false; });

function signout(){
	let session_id = getCookie("session_id");
	$.ajax( "/signout", {
		data : JSON.stringify({
			"session_id": session_id
		}),
		contentType : "application/json",
		type : "POST"}).done(function( res ) {
		clearCookie("session_id");
		window.location = "/";
	});
}