angular.module('AppService', []).factory('App', ['$http', function($http) {
    return {
        getTrendsWithCoordinates : function(lat, lng) {
            return $http.get('/api/trends/' + lat + '/' + lng); 
        },
    }       

}]);
