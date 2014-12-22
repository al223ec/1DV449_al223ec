var Nerd = require('./models/nerd');
var Bear = require('./models/bear');
var Trend = require('./models/trend');
var TwitterService = require('./services/twitter_service');

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
            res.json({ message: 'Api:et är vid liv!' });   
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

        app.get('api/twitter/trends', function(req, res){
            Trend.find(function(err, trends) {
                if (err){
                    res.send(err);
                }
                res.json(trends);
            });
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
            var service = new TwitterService(); 
            var error = function (err, response, body) {
                res.send(err);
            };
            var success = function (data) {
                          /*  data = JSON.parse(data); 
                var trend = data[0];
                var trends = JSON.parse(data)[0]['trends'];
    
                for (var i = 0; i < trends.length; i++) {
                    var trend = new Trend();
                    trend.name = trends[i]['name'];
                    trend.query = trends[i]['query']; 
                    trend.url = trends[i]['url'];  
                    
                    trend.save(function(err){
                        if (err){
                            res.send(err);
                        }
                    }); 
                 };*/

                res.send(data);
            };
            //service.getWorldwideTrends(error, success); 
            service.getTrend(23424954, error, success); 

            //twitter.getAvailableTrends({}, error, success); 
            //twitter.getTweets({'screen_name' : 'al223ec'}, error, success); 
        }); 

        app.get('api/twitter/:id', function(){

        }); 


        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };

