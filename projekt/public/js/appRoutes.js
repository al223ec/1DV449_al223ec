angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {

    $routeProvider
            // home page
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController'
            })

            .when('/twitter', {
                templateUrl: 'views/twitter.html',
                controller: 'TwitterController'
            })


            .when('/map', {
                templateUrl: 'views/map.html',
                controller: 'MainController'
            });
    
    $locationProvider.html5Mode(true);
}]);
