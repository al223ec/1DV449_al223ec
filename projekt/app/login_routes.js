module.exports = function(app, router, passport) {
    router.post('/loginUser', 
        passport.authenticate('local-login', { failureRedirect: '/login' }), function(req, res) {
            res.json({ loginOk: true }); 
        }
    );


    // Registrera ==============================
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup', 
        failureFlash : true // allow flash messages
    }));

    // PROFIL  ===================== kan endast nås om isLoggedin är true
    router.get('/profile', isLoggedIn, function(req, res) {
		res.json({ user : req.user }); 
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
    res.json({ loginOk: false }); 
}
