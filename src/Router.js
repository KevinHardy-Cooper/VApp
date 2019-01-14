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
// const CumulativeScore = require('./routes/CumulativeScore');
const History = require('./routes/History');
const SocialMediaScore = require('./routes/SocialMediaScore');
const Implications = require('./routes/Implications');

// Grouping route handlers together using express.Router object
const router = express.Router();

// Here we are configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', function(req, res) {
    res.send("GET request for the Home Page");
});

router.post('/signup', function(req, res, next) {
    SignUp.delegate(req.body.email, req.body.password, function(err, obj) {
        if (err) throw err;
        res.sendStatus(200);
    });
});

router.post('/signout', function(req, res) {
    SignOut.delegate(req.body.email, req.body.password, function(err, obj) {
        if (err) throw err;
        res.sendStatus(200);
    });
});

router.post('/signin', function(req, res) {
    SignIn.delegate(req.body.email, req.body.password, function(err, obj) {
        if (err) throw err;
        res.send(obj);
    });
});

router.get('/oauth/:socialMedia', function(req, res) {
    res.send("GET OAuth for given social media");
});

router.get('/setting/:socialMedia', function(req, res) {
    Settings.getSettings(req.params.socialMedia, function(err, obj) {
        if (err) throw err;
        res.send(obj);
    });
});

router.get('/cumulativeScore', function(req, res) {
    res.send("GET request for getting the users cumulative vulnerability score");
});

router.post('/cumulativeScore', function(req, res) {
    res.send("POST request add the most recent cumulative score to a scores DB");
});

router.get('/score/:userId', function(req, res) {
    History.getScores(req.params.userId, function(err, obj) {
        if (err) throw err;
        res.send(obj);
    });
});

router.get('/score/:userId/:socialMedia', function(req, res) {
    History.getUsersScoresGivenSocialMedia(req.params.userId, req.params.socialMedia, function(err, obj) {
        if (err) throw err;
        res.send(obj);
    });
});

router.post('/score/:socialMedia', function(req, res) {
    SocialMediaScore.calculateSocialMediaScore(req.body.userId, req.params.socialMedia, req.body.score, function(err, obj) {
        if (err) throw err;
        res.sendStatus(200);
    });
});

router.get('/implications/:settingId/', function(req, res) {
    Implications.getImplicationsForGivenSocialMediaSetting(req.params.settingId, function(err, obj) {
        if (err) throw err;
        res.send(obj);
    })
});

router.get('/implications/instructions/:implicationId/', function(req, res) {
    Implications.getInstructionsForGivenImplication(req.params.implicationId, function(err, obj) {
        if (err) throw err;
        res.send(obj);
    })
});

module.exports = router;