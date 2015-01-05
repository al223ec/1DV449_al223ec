var TrendQuery = require('./models/trend_query');
var TwitterService = require('./services/twitter_service');

module.exports = function(app, passport) {
    //Middleware, Detta sker vid varje request mot /servern
    app.use(function(req, res, next) {
        console.log('Request till servern!');
        next();
    });

    app.post('/loginUser', 
        passport.authenticate('local-login', { failureRedirect: '/login', }), function(req, res) {
            res.json({ 
                loginOk: true,
                user : req.user 
            }); 
        }
    );

    // Registrera ==============================
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup', 
        failureFlash : true // allow flash messages
    }));

    // PROFIL  ===================== kan endast nås om isLoggedin är true
    app.get('/userprofile', isLoggedIn, function(req, res) {
        res.json({ 
            loginOk: true,
            user : req.user 
        }); 
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    }
    // Api routes ==============================
    var service = new TwitterService();

    app.get('/api/', function(req, res) {
        res.json({ message: 'Api:et är vid liv!' }); 
    });
    app.get('/api/trends', function(req, res){
            TrendQuery.find(function(err, trendQueries) {
                if (err){
                    res.send(err);
                }
                res.json(trendQueries);
            });
         });

    app.get('/api/trends/:lat/:lng', isLoggedIn, function(req, res){
            console.log(req.user); 
            var woeidSuccess = function(data){
                data = JSON.parse(data)[0];
                var woeid = data['woeid'];
                service.getTrendsWithWoeid(woeid, error(res), success(res));   
            }
            service.getTrendsClosest(req.params.lat, req.params.lng, error(res), woeidSuccess);
        });

    function error(res){
        return function(err, response, body){
            res.send(err);
        }
    }
    function success(res){
        return function(data){
            res.send(data);
        }
    }

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        console.log('Request till *');
        res.sendfile('./public/index.html');
    });
};