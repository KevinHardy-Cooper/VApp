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
const Levels = require("./routes/Levels");
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
	if (req.params.socialMedia === "twitter" && req.session.oauthAccessToken === undefined) {
		res.redirect("/connect/twitter");
	} else if (req.params.socialMedia === "facebook" && req.session.facebookSettings === undefined) {
		res.redirect("/facebook");
	} else if (req.params.socialMedia === "instagram" && req.session.instagramSettings === undefined) {
		res.redirect("/instagram");
	} else {
		logger.info("GET request for the Settings Page");
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

router.get('/about', function(req, res) {
	logger.info("GET request for the About Page");
	res.sendFile(path.join(__dirname, '/public/views/about.html'));
});

router.post("/signup", function(req, res) {
	SignUp.delegate(req.body.email, req.body.password, function(err, obj) {
		if (err !== null || obj === null) {
			logger.error(inspect(err));
			res.sendFile(path.join(__dirname, "/public/views/error.html"));
		} else {
			if(obj.statusCode === 200) {
				let response = {
					"code": obj.statusCode,
					"success": obj.statusMessage
				};
				res.send(response);
				// TODO: show banner on front end regarding new user successfully created
			} else {
				res.send(obj);
			}
		}
	});
});

router.post("/signout", function(req, res) {
	SignOut.delegate(req.body.session_id, function(err, obj) {
		if (err !== null || obj === null) {
			logger.error(inspect(err));
			res.sendFile(path.join(__dirname, "/public/views/error.html"));
		} else {
			logger.info("Successful Sign Out");
			delete req.session["oauthRequestToken"];
			delete req.session["oauthRequestTokenSecret"];
			delete req.session["oauthAccessToken"];
			delete req.session["oauthAccessTokenSecret"];
			delete req.session["facebookSettings"];
			delete req.session["instagramSettings"];
			res.sendStatus(200);
		}
	});
});

router.post("/signin", function(req, res) {
	SignIn.delegate(req.body.email, req.body.password, function(err, obj) {
		if (err !== null || obj === null) {
			logger.error(inspect(err));
			res.sendFile(path.join(__dirname, "/public/views/error.html"));
		}else{
			res.send(obj);
		}
	});
});

router.get("/user/settings/:socialMedia", function(req, res) {
	// if the user tries to see their settings without going through oauth
	if (req.params.socialMedia === "twitter" && req.session.oauthAccessToken !== undefined) {
		// if the user tries to see their settings and have already gone through oauth
		consumer.get(
			"https://api.twitter.com/1.1/account/settings.json",
			req.session.oauthAccessToken,
			req.session.oauthAccessTokenSecret,
			function (err, data) {
				if (err !== null) {
					logger.error(inspect(err));
					res.sendFile(path.join(__dirname, "/public/views/error.html"));
				} else {
					logger.info("Successful Pull of User Settings from Twitter");
					res.send(data);
				}
			});
	} else if (req.params.socialMedia === "facebook") {
		logger.info("There are no facebook user settings to retrieve upon refresh, so sending settings from initial post");
		res.send(req.session.facebookSettings);
	} else if (req.params.socialMedia === "instagram") {
		logger.info("There are no instagram user settings to retrieve upon refresh, so sending settings from initial post");
		res.send(req.session.instagramSettings);
	} else {
		logger.info("Social media not supported");
		res.send({
			"code":204,
			"success":"Social media not supported"
		});
	}
});

router.get("/history/:sessionId", function(req, res) {
	History.getScoresBySessionId(req.params.sessionId, function(err, obj) {
		if (err !== null || obj === null) {
			logger.error(inspect(err));
			res.sendFile(path.join(__dirname, "/public/views/error.html"));
		}
		logger.info("Successful GET of score for sessionId");
		res.send(obj);
	});
});

router.get("/history/recent/:sessionId", function(req, res) {
	History.getMostRecentScoresBySessionId(req.params.sessionId, function(err, obj) {
		if (err !== null || obj === null) {
			logger.error(inspect(err));
			res.sendFile(path.join(__dirname, "/public/views/error.html"));
		}
		logger.info("Successful GET of score for sessionId by socialMedia");
		res.send(obj);
	});
});

router.post("/score/:socialMedia", function(req, res) {
	if (req.params.socialMedia === "facebook") {
		req.session.facebookSettings = req.body.settings;
	} else if (req.params.socialMedia === "instagram") {
		req.session.instagramSettings = req.body.settings;
	}

	SocialMediaScore.calculateSocialMediaScore(req.params.socialMedia, req.body.sessionId, req.body.settings, function(err, obj) {
		if (err !== null || obj === null) {
			logger.error(inspect(err));
			res.sendFile(path.join(__dirname, "/public/views/error.html"));
		}
		logger.info("Successful POST of score for socialMedia");
		res.send(obj);
	});
});

router.get("/implications/:socialMedia/:settingName/:settingState", function(req, res) {
	Implications.getImplications(req.params.socialMedia, req.params.settingName, req.params.settingState, function(err, obj) {
		if (err !== null || obj === null) {
			logger.error(inspect(err));
			res.sendFile(path.join(__dirname, "/public/views/error.html"));
		}
		logger.info("Successful GET of implications for settingId");
		res.send(obj);
	});
});

router.get("/instructions/:socialMedia/:settingName/:settingState", function(req, res) {
	Implications.getInstructions(req.params.socialMedia, req.params.settingName, req.params.settingState, function(err, obj) {
		if (err !== null || obj === null) {
			logger.error(inspect(err));
			res.sendFile(path.join(__dirname, "/public/views/error.html"));
		}
		logger.info("Sucessful GET of instructions for implicationId");
		res.send(obj);
	});
});

router.get("/level/:amount", function(req, res) {
	Levels.getLevel(req.params.amount, function(err, obj) {
		if (err !== null || obj === null) {
			logger.error(inspect(err));
			res.sendFile(path.join(__dirname, "/public/views/error.html"));
		}
		logger.info("Successful GET of level for amount");
		res.send(obj);
	});
});

router.get("/level/:sessionId/:socialMedia", function(req, res) {
	History.getMostRecentLevelBySessionIdAndSocialMedia(req.params.sessionId, req.params.socialMedia, function(err, obj) {
		if (err !== null || obj === null) {
			logger.error(inspect(err));
			res.sendFile(path.join(__dirname, "/public/views/error.html"));
		}
		logger.info("Successful GET of score for userId by socialMedia");
		res.send(obj);
	});
});

module.exports = router;