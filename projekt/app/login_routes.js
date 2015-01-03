module.exports = function(app, router, passport) {
    router.post('/loginUser', 
        passport.authenticate('local-login', { failureRedirect: '/login' }), function(req, res) {
            res.json({ 
                loginOk: true,
                user : req.user 
            }); 
        }
    );


    // Registrera ==============================
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup', 
        failureFlash : true // allow flash messages
    }));

    // PROFIL  ===================== kan endast nås om isLoggedin är true
    router.get('/userprofile', isLoggedIn, function(req, res) {
        res.json({ 
            loginOk: true,
            user : req.user 
        }); 
    });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use(router);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        return next();
    }
    
    res.redirect('/');
}
