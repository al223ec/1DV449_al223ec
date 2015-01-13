angular.module('MapService', []).factory('Map', ['App','$rootScope', function(AppService, $rootScope) {
	var map; 
	var infowindow = new google.maps.InfoWindow();

    var mapOptions = {
		zoom: 6,
		center: new google.maps.LatLng(62.38, 17.3), //Svall
		disableDefaultUI: true,
		styles : [{
	        "featureType": "administrative",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "simplified"
	            },
	            {
	                "color": "#e84c3c"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.locality",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.neighborhood",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#1e303d"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#e84c3c"
	            },
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "color": "#1e303d"
	            },
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "labels.icon",
	        "stylers": [
	            {
	                "color": "#f0c514"
	            },
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi.park",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#1e303d"
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#1e303d"
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "color": "#94a5a6"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#182731"
	            },
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "color": "#e77e24"
	            },
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#0e171d"
	            }
	        ]
	    }
	]};

	function getContent(query){
		var ret = ""; 
		ret += '<div id="content">'+ getHtmlStringTag("h1", query.locations.name);
		for(var i = 0; i < query.trends.length; i++){
			ret += getHtmlStringTag("li", query.trends[i].name + 
				'<a href="'+ query.trends[i].url +'"> <span class="twitter-link">| sök på </span><img alt="twitter-icon" src="../img/twitter_icon.png"> </a>'); 
		} 
		return ret; 

	};
	function getHtmlStringTag(tag, value){
		return '<' + tag + '>' + value + "</" + tag + '>'; 
	}; 

	function createMarker(lat, lng, query){
		var latLng = new google.maps.LatLng(lat, lng);
	    var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			title: query.locations.name,
			icon: '../img/tweet_marker.png',     
			draggable:true,
		});

		google.maps.event.addListener(marker, 'click', function() {
	        infowindow.setContent(getContent(query))
	        infowindow.open(map, marker);
	    });
	}; 


	return {
        get : function() {
            return map; 
        },
	    create : function(callback) {
	    	map = new google.maps.Map($('#map-canvas')[0], mapOptions);
	    	var queries = $rootScope.user.data.trendQueries; 
	    	if(queries){
		    	for(var i = 0; i < queries.length; i++){
		    		createMarker(queries[i].locations.lat, queries[i].locations.lng, queries[i]); 
		    	}
	    	}

		    google.maps.event.addListener(map, "rightclick", function(e) {
			    var lat = e.latLng.lat();
			    var lng = e.latLng.lng();

			    AppService.getTrendsWithCoordinates(lat, lng).success(function(response, status, headers, config) {
					createMarker(lat, lng, response.data);
					console.log(response.data); 
  				}).error(function(data, status, headers, config) {
    				console.log(data);
  				});
			}); 
        },
    }
}]);