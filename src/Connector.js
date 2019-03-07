// Imports
const express = require("express");
const oauth = require("oauth");
const session = require("express-session");
const sensitiveInfo = require("../config/SensitiveInfo.json");
const logger = require("../config/log.js");
const inspect = require("util").inspect;

// Grouping route handlers together using express.Router object
const connector = express.Router();

// Initializing the OAuth class
let consumer = new oauth.OAuth(
	"https://twitter.com/oauth/request_token",
	"https://twitter.com/oauth/access_token",
	sensitiveInfo.consumer_key,
	sensitiveInfo.consumer_secret_key,
	"1.0A",
	sensitiveInfo.callback_url,
	"HMAC-SHA1"
);

// Here we are setting up the session to work properly
connector.use(session({ secret: sensitiveInfo.cookie_signer, resave: false, saveUninitialized: true}));
connector.use(function(req, res, next) {
	res.locals.session = req.session;
	next();
});

// ENDPOINTS

connector.get("/connect/:socialMedia", function(req, res) {
	if (req.params.socialMedia === "twitter") {
		logger.info("Attempting to connect to Twitter");
		res.redirect("/oauth"); // send to /oauth endpoint
	} else {
		logger.info("Social media not supported");
		res.send({
			"code":204,
			"success":"Social media not supported"
		});
	}
});

// TWITTER ENDPOINTS
connector.get("/oauth", function(req, res) {
	consumer.get(
		"https://api.twitter.com/1.1/account/verify_credentials.json",
		req.session.oauthAccessToken,
		req.session.oauthAccessTokenSecret,
		function (err, data, response) {
			if (err) {
				if (err.statusCode === 403) {
					logger.info("Good Error for OAuth, User has not authorized app");
					res.redirect("/oauth/twitter"); // send to /oauth/:socialMedia endpoint
				} else {
					logger.error(inspect(err));
					res.status(err.statusCode).send(err);
				}
			} else {
				// no error means that user has authorized app
				logger.info("User has already authorized app");
				res.redirect("/settings"); // send to /settings/:socialMedia
			}
		});
});

connector.get("/oauth/callback", function(req, res) {
	if (req.query.denied) {
		logger.warn("User has denied the authorization of the app, sending them home");
		res.redirect("/");
	} else {
		consumer.getOAuthAccessToken(
			req.session.oauthRequestToken,
			req.session.oauthRequestTokenSecret,
			req.query.oauth_verifier,
			function (err, oauthAccessToken, oauthAccessTokenSecret, results) {

				if (err) {
					logger.error(inspect(err));
					res.sendFile(path.join(__dirname, "/public/views/error.html"));
				} else {
					req.session.oauthAccessToken = oauthAccessToken;
					req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
					logger.info("Callback successful, now directing to /settings/twitter");
					res.redirect("/settings"); // send to /settings/:socialMedia
				}
			});
	}
});

connector.get("/oauth/:socialMedia", function(req, res) {
	consumer.getOAuthRequestToken(
		function(err, oauthToken, oauthTokenSecret, results) {
			if (err) {
				logger.error(inspect(err));
				res.sendFile(path.join(__dirname, "/public/views/error.html"));
			} else {
				req.session.oauthRequestToken = oauthToken;
				req.session.oauthRequestTokenSecret = oauthTokenSecret;
				logger.info("Request for Twitter login page successful");
				res.redirect("https://twitter.com/oauth/authorize?oauth_token=" + req.session.oauthRequestToken);
			}
		});
});

module.exports = connector;