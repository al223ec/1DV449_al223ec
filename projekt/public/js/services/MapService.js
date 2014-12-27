angular.module('MapService', []).factory('Map', ['AppService', function(appService) {
	var map; 
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

	return {
        get : function() {
            return map; 
        },
        
	    create : function() {
	    	map = new google.maps.Map($('#map-canvas')[0], mapOptions);

		    google.maps.event.addListener(map, "rightclick", function(e) {	
			    var lat = e.latLng.lat();
			    var lng = e.latLng.lng();
			    // populate yor box/field with lat, lng
			    alert("Lat=" + lat + "; Lng=" + lng);
			}); 
        },
    }
}]);