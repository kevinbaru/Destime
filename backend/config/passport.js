var FacebookStrategy = require('passport-facebook').Strategy;
//var GoogleStrategy = require('passport-google-oauth2').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var configAuth = require('./auth');

var models = require('../models/models');
var User = models.User

module.exports = function(passport) {

    passport.use(new GoogleStrategy({
      clientID        : configAuth.googleAuth.clientID,
      clientSecret    : configAuth.googleAuth.clientSecret,
      callbackURL     : configAuth.googleAuth.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleID: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
    ));

    passport.use(new LocalStrategy(function(username, password, done) {

      // Find the user with the given username
        User.findOne({ username: username }, function (err, user) {
          // if there's an error, finish trying to authenticate (auth failed)
          if (err) {

            return done(err);
          }
          // if no user present, auth failed
          if (!user) {

            return done(null, false, {message:'Incorrect username'});
          }
          // if passwords do not match, auth failed
          if (user.password !== password) {

            return done(null, false,{message: 'Incorrect password.'});
          }
          // auth has has succeeded
          return done(null, user);
        });
      }
    ));

    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback : true,
        profileFields: ['id', 'emails','displayName','photos', 'name']
    },
    function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({facebookID: profile.id}, function(err, user) {
                if (err) {
                    return done(err);
                }
                // create a new account with this Facebook ID
                if (!user) {
                    var newUser = new User({
                        firstname: profile.name.givenName,
                        username: profile.displayName,
                        facebookToken: token,
                        fbrefreshToken:refreshToken,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        facebookID: profile.id,
                        pictureURL: profile.photos[0].value,
                        friends: profile._json.friends.data
                    });
                    newUser.save(function(err, result) {
                        if (err) {
                            return done(err);
                        }
                        return done(null, newUser);
                    });
                }
                else {
                    return done(null, user);
                }
            });

        });
    }));


    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL

    },
    function(token, tokenSecret, profile, done) {
        User.findOne({twitterID: profile.id}, function(err, user) {
            if (err) {
                return done(err);
            }
            // create a new account with this Facebook ID
            if (!user) {
                var newUser = new User({
                    // Twitter does not split first and family name
                    firstname: profile.name.split(" ")[0],
                    lastname: profile.name.split(" ")[1],
                    email: profile.emails[0].value,
                    twitterID: profile.id,
                    username: profile.displayName,
                    pictureURL: profile.photos[0].value,
                    twitterToken: token,
                    twitterTokenSecret: tokenSecret
                });
                newUser.save(function(err, result) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                });
            }
            else {
                return done(null, user);
            }
        });
    }));


    passport.use(new LinkedInStrategy({
        clientID        : configAuth.linkedinAuth.clientID,
        clientSecret    : configAuth.linkedinAuth.clientSecret,
        callbackURL     : configAuth.linkedinAuth.callbackURL,
        scope: ['r_emailaddress', 'r_basicprofile'],
        state: true,
        passReqToCallback : true,
    },
    function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({linkedinID: profile.id}, function(err, user) {
                if (err) {
                    return done(err);
                }
                // create a new account with this Facebook ID
                if (!user) {
                    var newUser = new User({
                        firstname: profile.name.givenName,
                        lastname: profile.name.familyName,
                        email: profile.emails[0].value,
                        pictureURL: profile.photos[0].value,
                        linkedinID: profile.id,
                        lntoken:token,
                        lnrefreshtoken:refreshToken,
                    });
                    newUser.save(function(err, result) {
                        if (err) {
                            return done(err);
                        }
                        return done(null, newUser);
                    });
                }
                else {
                    return done(null, user);
                }
            });

        });
    }));



};
