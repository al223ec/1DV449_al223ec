angular.module('MapService', []).factory('Map', ['App','AuthService', function(AppService, AuthService) {
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

	function getContent(data){
		var ret = ""; 
		ret += '<div id="content">'+ getHtmlStringTag("h1", data['locations'][0]['name']);
		for(var i = 0; i < data.trends.length; i++){
			ret += getHtmlStringTag("li", data.trends[i].name + '<a href="'+ data.trends[i].url +'">Twitter </a>'); 
		} 
		//Exempel Object {trends: Array[10], as_of: "2015-01-13T14:13:42Z", created_at: "2015-01-13T14:06:15Z", locations: Array[1]}as_of: "2015-01-13T14:13:42Z"created_at: "2015-01-13T14:06:15Z"locations: Array[1]trends: Array[10]0: Objectname: "Oslo"promoted_content: nullquery: "Oslo"url: "http://twitter.com/search?q=Oslo"__proto__: Objectname
		return ret; 

	};
	function getHtmlStringTag(tag, value){
		return '<' + tag + '>' + value + "</" + tag + '>'; 
	}; 

	function createMarker(lat, lng, data){
		var latLng = new google.maps.LatLng(lat, lng);
	    var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			title: data['locations'][0]['name']
		});

		google.maps.event.addListener(marker, 'click', function() {
	        infowindow.setContent(getContent(data))
	        infowindow.open(map, marker);
	    });
	}; 


	return {
        get : function() {
            return map; 
        },
        infowindow : infowindow,
        
	    create : function(callback) {
	    	map = new google.maps.Map($('#map-canvas')[0], mapOptions);

		    google.maps.event.addListener(map, "rightclick", function(e) {
			    var lat = e.latLng.lat();
			    var lng = e.latLng.lng();

			    console.log("Clicked"); 

			    AppService.getTrendsWithCoordinates(lat, lng).success(function(data, status, headers, config) {
					console.log(data);
					createMarker(lat, lng, data);

  				}).error(function(data, status, headers, config) {
    				console.log(data);
  				});
			}); 
        },
    }
}]);