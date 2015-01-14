var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User        = require('../app/models/user');
var configAuth = require('./auth');

module.exports = function(passport) {
    // passport session setup ==================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //Definera strategi
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            process.nextTick(function() {
                //Kontroller om emial:en redan finns registrerad
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err){
                        return done(err);
                    }
                    if (user) {
                        //fattar inte hur jag får ut dessa till klienten passport per default 
                        //returnerar en 401 vid misslyckande
                        return done(null, false, { message : 'Emailen finns redan registrerad.' });
                    } else {
                        var newUser            = new User();
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err){
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }

                });    
            });
        })
    );

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, email, password, done) { 
            User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err){
                    return done(err);
                }

                if (!user){
                    return done(null, false, { message : "Emailen finns inte!"}); 
                }
                if (!user.validPassword(password)){
                    return done(null, false, {message : "Fel lösenord"}); 
                }
                //success
                return done(null, user);
            });
        })
    );

    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    },

    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                // ie an error connecting to the database
                if (err){
                    return done(err);
                }

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();
                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err){
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
};