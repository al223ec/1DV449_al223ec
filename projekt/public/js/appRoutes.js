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
            })
            .when('/authenticate', {
                templateUrl: 'views/auth.html',
                controller: 'AuthController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'AuthController'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'AuthController'
            })
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller: 'AuthController'
            })
            .otherwise({redirectTo: '/'});
    
    $locationProvider.html5Mode(true);
}]);
