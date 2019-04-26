/*
    MOD-002
 */

// Imports
const express = require("express");
const bodyParser = require("body-parser");
const SignUp = require("./routes/SignUp");
const SignIn = require("./routes/SignIn");
const SignOut = require("./routes/SignOut");
const History = require("./routes/History");
const SocialMediaScore = require("./routes/SocialMediaScore");
const Implications = require("./routes/Implications");
const Account = require("./routes/Account");
const oauth = require("oauth");
const session = require("express-session");
const sensitiveInfo = require("../config/SensitiveInfo.json");
const logger = require("../config/log.js");
const inspect = require("util").inspect;
const path = require("path");

// Grouping route handlers together using express.Router object
const router = express.Router();

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

// Here we are configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Serve static content for the app from the "public" directory in the application directory.
router.use(express.static(__dirname + "/public"));

// Here we are setting up the session to work properly
router.use(session({ secret: sensitiveInfo.cookie_signer, resave: false, saveUninitialized: true}));
router.use(function(req, res, next) {
	res.locals.session = req.session;
	next();
});

// ENDPOINTS

router.get("/", function(req, res) {
	logger.info("GET request for the Home Page");
	res.sendFile(path.join(__dirname, "/public/views/home.html"));
});

router.get("/dashboard", function(req, res) {
	logger.info("GET request for the Dashboard Page");
	res.sendFile(path.join(__dirname, "/public/views/dashboard.html"));
});

router.get("/signin", function(req, res) {
	logger.info("GET request for the SignIn Page");
	res.sendFile(path.join(__dirname, "/public/views/signin.html"));
});

router.get("/signup", function(req, res) {
	logger.info("GET request for the SignUp Page");
	res.sendFile(path.join(__dirname, "/public/views/signup.html"));
});

router.get("/settings/:socialMedia", function(req, res) {
	logger.info("GET request for the Settings Page for " + req.params.socialMedia);
	if (req.params.socialMedia === "twitter" && req.session.oauthAccessToken === undefined) {
		res.redirect("/connect/twitter");
	} else if (req.params.socialMedia === "facebook" && req.session.facebookSettings === undefined) {
		res.redirect("/facebook");
	} else if (req.params.socialMedia === "instagram" && req.session.instagramSettings === undefined) {
		res.redirect("/instagram");
	} else {
		res.sendFile(path.join(__dirname, "/public/views/settings.html"));
	}
});

router.get("/history", function(req, res) {
	logger.info("GET request for the History Page");
	res.sendFile(path.join(__dirname, "/public/views/history.html"));
});

router.get("/facebook", function(req, res) {
	logger.info("GET request for the Facebook Page");
	res.sendFile(path.join(__dirname, "/public/views/facebook.html"));
});

router.get("/instagram", function(req, res) {
	logger.info("GET request for the Instagram Page");
	res.sendFile(path.join(__dirname, "/public/views/instagram.html"));
});

router.get("/about", function(req, res) {
	logger.info("GET request for the About Page");
	res.sendFile(path.join(__dirname, "/public/views/about.html"));
});

router.get("/faqs", function(req, res) {
	logger.info("GET request for the FAQS Page");
	res.sendFile(path.join(__dirname, "/public/views/faqs.html"));
});

router.get("/account", function(req, res) {
	logger.info("GET request for the Account Page");
	res.sendFile(path.join(__dirname, "/public/views/account.html"));
});

router.get("/error", function(req, res) {
	logger.info("GET request for the Error Page");
	res.sendFile(path.join(__dirname, "/public/views/error.html"));
});

router.post("/signup", function(req, res) {
	logger.info("POST request for SignUp");
	SignUp.delegate(req.body.email, req.body.password, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.post("/signout", function(req, res) {
	logger.info("POST request for SignOut");
	SignOut.delegate(req.body.session_id, function(error, result) {
		delete req.session["oauthRequestToken"];
		delete req.session["oauthRequestTokenSecret"];
		delete req.session["oauthAccessToken"];
		delete req.session["oauthAccessTokenSecret"];
		delete req.session["facebookSettings"];
		delete req.session["instagramSettings"];
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.post("/signin", function(req, res) {
	logger.info("POST request for SignIn");
	SignIn.delegate(req.body.email, req.body.password, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.get("/user/settings/:socialMedia", function(req, res) {
	logger.info("GET request for user settings for " + req.params.socialMedia);
	// if the user tries to see their settings without going through oauth
	if (req.params.socialMedia === "twitter" && req.session.oauthAccessToken !== undefined) {
		// if the user tries to see their settings and have already gone through oauth
		consumer.get(
			"https://api.twitter.com/1.1/account/settings.json",
			req.session.oauthAccessToken,
			req.session.oauthAccessTokenSecret,
			function (error, data) {
				if (error !== null) {
					logger.error(inspect(error));
					res.sendFile(path.join(__dirname, "/public/views/error.html"));
				} else {
					let data_json = JSON.parse(data);
					let response = {
						"code": 200,
						"message": "User Settings for Twitter retrieved",
						"socialMedia": "twitter",
						"protected": data_json.protected,
						"geo_enabled": data_json.geo_enabled,
						"discoverable_by_email": data_json.discoverable_by_email,
						"allow_dms_from": data_json.allow_dms_from,
						"use_cookie_personalization": data_json.use_cookie_personalization
					};
					res.send(response);
				}
			});
	} else if (req.params.socialMedia === "facebook") {
		// TODO: since no updated facebook settings, require different way to handle refresh
		logger.info("There are no facebook user settings to retrieve upon refresh, so sending settings from initial post");
		let response = {
			"code": 200,
			"message": "User Settings for Facebook retrieved",
			"socialMedia": "facebook",
			"future_posts": req.session.facebookSettings.future_posts,
			"friend_requests": req.session.facebookSettings.friend_requests,
			"friends_list": req.session.facebookSettings.friends_list,
			"discoverable_by_email": req.session.facebookSettings.discoverable_by_email,
			"discoverable_by_phone": req.session.facebookSettings.discoverable_by_phone,
			"discoverable_by_search_engine": req.session.facebookSettings.discoverable_by_search_engine
		};
		res.send(response);
	} else if (req.params.socialMedia === "instagram") {
		// TODO: since no updated instagram settings, require different way to handle refresh
		logger.info("There are no instagram user settings to retrieve upon refresh, so sending settings from initial post");
		let response = {
			"code": 200,
			"message": "User Settings for Instagram retrieved",
			"socialMedia": "instagram",
			"account_privacy": req.session.instagramSettings.account_privacy,
			"activity_status": req.session.instagramSettings.activity_status,
			"story_sharing": req.session.instagramSettings.story_sharing,
			"usertag_review": req.session.instagramSettings.usertag_review
		};
		res.send(response);
	} else {
		logger.info("Social media not supported");
		let response = {
			"code": 415,
			"message": "Unsupported social media type"
		};
		res.send(response);
	}
});

router.get("/score/all/:sessionId", function(req, res) {
	logger.info("GET request for all scores for the sessionId " + req.params.sessionId);
	History.getScoresBySessionId(req.params.sessionId, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.get("/score/recent/:sessionId", function(req, res) {
	logger.info("GET request for recent scores for the sessionId " + req.params.sessionId);
	History.getMostRecentScoresBySessionId(req.params.sessionId, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.post("/score/:socialMedia", function(req, res) {
	logger.info("POST request for new score for " + req.params.socialMedia);
	if (req.params.socialMedia === "facebook") {
		req.session.facebookSettings = req.body.settings;
	} else if (req.params.socialMedia === "instagram") {
		req.session.instagramSettings = req.body.settings;
	}

	SocialMediaScore.calculateSocialMediaScore(req.params.socialMedia, req.body.sessionId, req.body.settings, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.get("/implications/:socialMedia/:settingName/:settingState", function(req, res) {
	logger.info("GET request for implications");
	Implications.getImplications(req.params.socialMedia, req.params.settingName, req.params.settingState, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.get("/implicationWeights/:socialMedia/:settingName", function(req, res) {
	logger.info("GET request for implication weights");
	Implications.getAllWeightsForSetting(req.params.socialMedia, req.params.settingName, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			logger.info("Successful GET of all implication weights for a setting");
			res.send(result);
		}
	});
});

router.get("/instructions/:socialMedia/:settingName/:settingState", function(req, res) {
	logger.info("GET request for instructions");
	Implications.getInstructions(req.params.socialMedia, req.params.settingName, req.params.settingState, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.get("/grade/:sessionId/:socialMedia", function(req, res) {
	logger.info("GET request for grade for " + req.params.sessionId + " for most recent " + req.params.socialMedia + " grade");
	History.getMostRecentGradeBySessionIdAndSocialMedia(req.params.sessionId, req.params.socialMedia, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.post("/update/email", function(req, res) {
	logger.info("POST request to update email");
	Account.updateEmailBySessionId(req.body.sessionId, req.body.email, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.post("/update/password", function(req, res) {
	logger.info("POST request to update password");
	Account.updatePasswordBySessionId(req.body.sessionId, req.body.password, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

router.post("/delete", function(req, res) {
	logger.info("POST request to delete user");
	Account.deleteAccountBySessionId(req.body.sessionId, function(error, result) {
		if (error !== null || result === null) {
			logger.error(inspect(error));
			res.send(error);
		} else {
			res.send(result);
		}
	});
});

module.exports = router;