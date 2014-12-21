var Nerd = require('./models/nerd');
var Bear = require('./models/bear');
var Twitter = require('../lib/twitter');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        //app.route('/api/');

        // sample api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err){
                    res.send(err);
                } 
                res.json(nerds); // return all nerds in JSON format
            });
        });

        app.get('/api/', function(req, res) {
            res.json({ message: 'Välkommen till mitt api!' });   
        });

        // route to handle creating goes here (app.post)
        app.post('/api/bears', function(req, res){
            var bear = new Bear(); 
            bear.name = req.body.name; 

            bear.save(function(err){
                if (err){
                    res.send(err);
                }

                 res.json({ message: 'Bear created!' }); 
            })

        });

        app.get('/api/bears', function(req, res) {
            Bear.find(function(err, bears) {
                if (err){
                    res.send(err);
                }
                res.json(bears);
            });
        });

        app.get('/api/twitter', function(req, res){
            var twitter = new Twitter({
                "consumerKey": "FK9XoCuRrCUVeLQeiLvIhZnU9",
                "consumerSecret": "cbXiVbtElhpoOsLCwHNosGmP1OXgzEMHuosYydvYVRXo6fDvzQ",
                "accessToken": "2817132410-kDwQxyG1GlGf7Go3ghnJCMMJbqykFXZMNUN9t7d",
                "accessTokenSecret": "Ylvg2sPJwKsn8M6WS4Gmc6vmK85cmVNvzbH50BUQhxef4",
                "callBackUrl": "antonledstrom.se"
            }); 

            var error = function (err, response, body) {
                res.send(err);
            };
            var success = function (data) {
                res.send(data);
            };
            twitter.getTrendsFromPlace({'id' : 890869}, error, success); 
            //twitter.getAvailableTrends({}, error, success); 
            //twitter.getTweets({'screen_name' : 'al223ec'}, error, success); 
        }); 

        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };

