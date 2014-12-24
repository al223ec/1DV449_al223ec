var Twitter = require('../../lib/twitter');
module.exports = function TwitterService(){
	var worldwide = 1; 

	this.cities = {
		stockholm : 906057,
		gothenburg : 890869, 
		london : 44418, 
		berlin : 638242 
	}; 
/*	
	var paris = 615702; 
	var amsterdam = 727232; 
	var rom = 721943; 
	var madrid = 766273; 
	var copenhagen = 554890; 
	var hamburg = 656958; 
*/
	this.countries = {
		belgium : 23424757, 
		sweden : 23424954, 
		denmark : 23424796,
		england : 24554868, 
	};

	var twitter = new Twitter({
                "consumerKey": "FK9XoCuRrCUVeLQeiLvIhZnU9",
                "consumerSecret": "cbXiVbtElhpoOsLCwHNosGmP1OXgzEMHuosYydvYVRXo6fDvzQ",
                "accessToken": "2817132410-kDwQxyG1GlGf7Go3ghnJCMMJbqykFXZMNUN9t7d",
                "accessTokenSecret": "Ylvg2sPJwKsn8M6WS4Gmc6vmK85cmVNvzbH50BUQhxef4",
                "callBackUrl": "antonledstrom.se"
            });


	this.getWorldwideTrends = function(error, success){
		twitter.getTrendsFromPlace({'id' : worldwide}, error, success); 
	}; 

	this.getTrend = function(id, error,success){
		twitter.getTrendsFromPlace({'id' : id}, error, success); 
	};

	this.getTweetsWithTrend = function(trendName, error, success){
		twitter.searchTweets({ 'q' : trendName}, error, success)
	};

	this.searchTweets = function(error, success){
		twitter.searchTweets({ 'q' : 'ShortGirlAppreciationDay'}, error, success)
	}; 
}