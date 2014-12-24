var Nerd = require('./models/nerd');
var Bear = require('./models/bear');
var TrendQuery = require('./models/trend_query');
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

        app.get('/api/trends', function(req, res) {
            TrendQuery.find(function(err, trendQuery) {
                if (err){
                    res.send(err);
                }
                res.json(trendQuery);
            });
        });

        app.get('/api/twitter', function(req, res){
            var service = new TwitterService(); 
            var error = function (err, response, body) {
                res.send(err);
            };
            var success = function (data) {
                data = JSON.parse(data)[0]; 
                var trendQuery = new TrendQuery(); 

                trendQuery.as_of = new Date(data['as_of']);
                trendQuery.created_at = new Date(data['created_at']); 
                trendQuery.locations.name = data['locations']['name']; 
                trendQuery.locations.woeid = data['locations']['woeid']; 

                 for (var i = 0; i < data['trends'].length; i++) {
                    trendQuery.trends.push({
                        name : data['trends'][i]['name'],
                        query : data['trends'][i]['query'],
                        url : data['trends'][i]['url'],
                    });
                }

                trendQuery.save(function(err){
                    console.log(err); 

                        if (err){
                            res.send(err);
                        }
                    }); 
                res.send(data);
            };
            //service.getWorldwideTrends(error, success);
            //service.searchTweets(error, success);  
            service.getTrend(service.cities.london, error, success); 

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

