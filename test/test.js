var assert = require('assert');
const User = require("../src/routes/User");

// This is testing the User module
describe('User', function() {
    context('insertUser', function() {
        it('should insert a test user into the database', function(done) {
            email = "test@email.com";
            password = "password";
            User.insertUser(email, password, function(err, obj) {
                if (err) done(err);
                else {
                    User.getUserByEmail(email, function(err, obj) {
                        if (err) done(err);
                        assert.equal(obj[0].email, email);
                    });
                    done();
                }
            });
        });
    });
    context('getUserByEmail', function() {
        it('should get the test user by email from the database', function(done) {
            email = "test@email.com";
            User.getUserByEmail(email, function(err, obj) {
                if (err) done(err);
                else {
                    assert.equal(obj.statusCode, 200);
                    assert.equal(obj[0].email, email);
                    done();
                }
            });
        });
    });
    context('getUser', function() {
        it('should get the test user by email and password from the database', function(done) {
            email = "test@email.com";
            password = "password";
            User.getUser(email, password, function(err, obj) {
                if (err) done(err);
                else {
                    assert.equal(obj.statusCode, 200);
                    assert.equal(obj[0].email, email);
                    assert.equal(obj[0].password, password);
                    done();
                }
            });
        });
    });
});
