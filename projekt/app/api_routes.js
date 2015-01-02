var TrendQuery = require('./models/trend_query');
var TwitterService = require('./services/twitter_service');

    module.exports = function(app, router) {
        var service = new TwitterService();
        //Middleware, Detta sker vid varje request mot /api
        router.use(function(req, res, next) {
            console.log('Request till api:et.');
            next();
        });

        router.get('/', function(req, res) {
            res.json({ message: 'Api:et är vid liv!' }); 
        });
        router.route('/trends')
             .post(function(req, res) {

             })
             .get(function(req, res){
                TrendQuery.find(function(err, trendQueries) {
                    if (err){
                        res.send(err);
                    }
                    res.json(trendQueries);
                });
             });

        router.route('/trends/:lat/:lng')
            .get(function(req, res){
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
        app.use('/api', router);
        // frontend routes =========================================================
        // route to handle all angular requests
        /* app.get('*', function(req, res) {
            console.log('Request till *');
            res.redirect('/');
        });
   
      
        /*
        // sample api route
        app.get('/api/bears', function(req, res) {
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

        app.get('/Api/', function(req, res) {
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
            TrendQuery.find(function(err, trendQueries) {
                if (err){
                    res.send(err);
                }
                res.json(trendQueries);
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
                TrendQuery.findOne({}).sort({ created_at : 'desc' }).exec(function(err, _trendQuery){
                    if (err){
                        res.send(err);
                    }
                    if(_trendQuery.created_at < trendQuery.created_at){
                        trendQuery.save(function(err){
                            console.log(err + " sparar"); 
                            if (err){
                                res.send(err);
                            }
                        }); 
                        res.send(data);
                    }else{
                        res.json({ message: 'no updates!' }); 
                    }
                });

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
*/

    };

