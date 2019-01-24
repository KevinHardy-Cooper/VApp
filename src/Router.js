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
const oauth = require('oauth');
const session = require('express-session');
const SensitiveInfo = require('../config/SensitiveInfo');
const logger = require('../config/log.js');
const inspect = require('util').inspect;

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

router.post('/signup', function(req, res, next) {
    SignUp.delegate(req.body.email, req.body.password, function(err, obj) {
        if (err){
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        } else {
            logger.info(obj.statusMessage);
            res.send({
                "code":obj.statusCode,
                "success":obj.statusMessage
            });
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
            res.send({
                "code":obj.statusCode,
                "success":obj.statusMessage
            });
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
        logger.info("Successful GET of score for userId")
        res.send(obj);
    });
});

router.get('/score/:userId/:socialMedia', function(req, res) {
    History.getUsersScoresGivenSocialMedia(req.params.userId, req.params.socialMedia, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Successful GET of score for userId by socialMedia")
        res.send(obj);
    });
});

router.post('/score/:socialMedia', function(req, res) {
    SocialMediaScore.calculateSocialMediaScore(req.body.userId, req.params.socialMedia, req.body.score, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Successful POST of score for socialMedia")
        res.sendStatus(200);
    });
});

router.get('/implications/:settingId/', function(req, res) {
    Implications.getImplicationsForGivenSocialMediaSetting(req.params.settingId, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Successful GET of implications for settingId")
        res.send(obj);
    })
});

router.get('/instructions/:implicationId/', function(req, res) {
    Implications.getInstructionsForGivenImplication(req.params.implicationId, function(err, obj) {
        if (err) {
            logger.error(inspect(err));
            res.status(err.statusCode).send(err);
        }
        logger.info("Sucessful GET of instructions for implicationId")
        res.send(obj);
    })
});

module.exports = router;