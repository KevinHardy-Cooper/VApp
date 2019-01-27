/*
    MOD-002
 */

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const SignUp = require('./routes/SignUp');
const SignIn = require('./routes/SignIn');
const SignOut = require('./routes/SignOut');
const Settings = require('./routes/Settings');
const CumulativeScore = require('./routes/CumulativeScore');
const History = require('./routes/History');
const SocialMediaScore = require('./routes/SocialMediaScore');
const Implications = require('./routes/Implications');
const Levels = require('./routes/Levels');
const oauth = require('oauth');
const session = require('express-session');
const SensitiveInfo = require('../config/SensitiveInfo');
const logger = require('../config/log.js');
const inspect = require('util').inspect;
const path = require('path');

// Grouping route handlers together using express.Router object
const router = express.Router();

// Creating an instance of SensitiveInfo
const sensitiveInfo = new SensitiveInfo();

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
router.use(express.static(__dirname + '/public'));

// Here we are setting up the session to work properly
router.use(session({ secret: sensitiveInfo.cookie_signer, resave: false, saveUninitialized: true}));
router.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

// ENDPOINTS

router.get('/', function(req, res) {
    logger.info("GET request for the Home Page");
    res.send("GET request for the Home Page");
});

router.get('/dashboard', function(req, res) {
    logger.info("GET request for the Dashboard Page");
    res.sendFile(path.join(__dirname, '/public/views/dashboard.html'));
});

router.get('/signin', function(req, res) {
    logger.info("GET request for the SignIn Page");
    res.sendFile(path.join(__dirname, '/public/views/signin.html'));
});

router.get('/signup', function(req, res) {
    logger.info("GET request for the SignIn Page");
    res.sendFile(path.join(__dirname, '/public/views/signup.html'));
});

router.get('/settings', function(req, res) {
    logger.info("GET request for the Settings Page");
    res.sendFile(path.join(__dirname, '/public/views/settings.html'));
});

router.post('/signup', function(req, res) {
    SignUp.delegate(req.body.email, req.body.password, function(err, obj) {
        if (err){
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        } else {
            if(obj.statusCode === 200) {
                res.redirect('/signin');
                // TODO: show banner on front end regarding new user successfully created
            } else {
                res.send(obj);
                // TODO: do something here to handle on front end to show user that email already exists
            }
        }
    });
});

router.post('/signout', function(req, res) {
    SignOut.delegate(req.body.email, req.body.password, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        } else {
            logger.info("Successful Sign Out");
            res.sendStatus(200);
        }
    });
});

router.post('/signin', function(req, res) {
    SignIn.delegate(req.body.email, req.body.password, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }else{
            logger.info(obj.statusMessage);
            if(obj.statusCode === 200) {
                res.redirect('/dashboard');
            }
        }
    });
});

router.get('/settings/:socialMedia', function(req, res){
    if (req.params.socialMedia === 'twitter') {
        consumer.get(
            "https://api.twitter.com/1.1/account/settings.json",
            req.session.oauthAccessToken,
            req.session.oauthAccessTokenSecret,
            function (err, data) {

                if (err) {
                    logger.error(inspect(err));
                    res.status(err.statusCode).send(err);
                } else {
                    logger.info("Successful Pull of User Settings from Twitter");
                    res.send(data);
                }
            });
    } else {
        logger.info("Social media not supported");
        res.send({
            "code":204,
            "success":"Social media not supported"
        });
    }
});

router.get('/cumulativeScore', function(req, res) {
    res.send("GET request for getting the users cumulative vulnerability score");
});

router.post('/cumulativeScore', function(req, res) {
    res.send("POST request add the most recent cumulative score to a scores DB");
});

router.get('/score/:userId', function(req, res) {
    History.getScores(req.params.userId, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Successful GET of score for userId");
        res.send(obj);
    });
});

router.get('/score/:userId/:socialMedia', function(req, res) {
    History.getUsersScoresGivenSocialMedia(req.params.userId, req.params.socialMedia, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Successful GET of score for userId by socialMedia");
        res.send(obj);
    });
});

router.post('/score/:socialMedia', function(req, res) {
    SocialMediaScore.calculateSocialMediaScore(req.params.socialMedia, req.body.settings, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Successful POST of score for socialMedia")
        res.send(obj);
    });
});

router.get('/implications/:socialMedia/:settingName/:settingState', function(req, res) {
    Implications.getImplications(req.params.socialMedia, req.params.settingName, req.params.settingState, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Successful GET of implications for settingId");
        res.send(obj);
    })
});

router.get('/instructions/:socialMedia/:settingName/:settingState', function(req, res) {
    Implications.getInstructions(req.params.socialMedia, req.params.settingName, req.params.settingState, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Sucessful GET of instructions for implicationId");
        res.send(obj);
    })
});

router.get('/level/:amount', function(req, res) {
    Levels.getLevel(req.params.amount, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Successful GET of level for amount");
        res.send(obj);
    })
})

router.get('/level/:userId/:socialMedia', function(req, res) {
    History.getUsersLevelGivenSocialMedia(req.params.userId, req.params.socialMedia, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Successful GET of score for userId by socialMedia");
        res.send(obj);
    });
});

module.exports = router;