var Twitter = require('../../lib/twitter');
module.exports = function TwitterService(){
	var worldwide = 1; 
	var stockholm = 90820569;
	var london = 44418; 
	var berlin = 638242; 
	var paris = 615702; 
	var amsterdam = 727232; 
	var rom = 721943; 
	var madrid = 766273; 
	var copenhagen = 554890; 
	var hamburg = 656958; 


	var belgium = 23424757; 
	var sweden = 23424954; 
	var denmark = 23424796; 
	var england = 24554868; 





	var twitter = new Twitter({
                "consumerKey": "FK9XoCuRrCUVeLQeiLvIhZnU9",
                "consumerSecret": "cbXiVbtElhpoOsLCwHNosGmP1OXgzEMHuosYydvYVRXo6fDvzQ",
                "accessToken": "2817132410-kDwQxyG1GlGf7Go3ghnJCMMJbqykFXZMNUN9t7d",
                "accessTokenSecret": "Ylvg2sPJwKsn8M6WS4Gmc6vmK85cmVNvzbH50BUQhxef4",
                "callBackUrl": "antonledstrom.se"
            });

	var that = this; 


	this.getWorldwideTrends = function(error, success){
		twitter.getTrendsFromPlace({'id' : worldwide}, error, success); 
	}; 
	this.getTrend = function(id, error,success){
		twitter.getTrendsFromPlace({'id' : id}, error, success); 
	}; 

	this.searchTweets = function(query){

	}; 
}