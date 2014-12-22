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
            });
    
    $locationProvider.html5Mode(true);
}]);
