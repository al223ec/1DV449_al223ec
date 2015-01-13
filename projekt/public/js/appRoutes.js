angular.module('appRoutes', []).config(['$routeProvider','$httpProvider', '$locationProvider', 
    function($routeProvider, $httpProvider, $locationProvider) {
        function checkLoggedIn($q, $log, AuthService) {
            var deferred = $q.defer();

            AuthService.getUserProfile().then(function(){
                if (!AuthService.isAuthenticated()) {
                    $log.log('authentication required. redirect to login');
                    deferred.reject({ needsAuthentication: true });
                } else {
                    deferred.resolve();
                }
            });
 
            return deferred.promise;
        }
     
        $routeProvider.whenAuthenticated = function (path, route) {
            route.resolve = route.resolve || {};
            angular.extend(route.resolve, { 
                isLoggedIn: ['$q', '$log', 'AuthService', checkLoggedIn] 
            });
            return $routeProvider.when(path, route);
        }
        $routeProvider
                .whenAuthenticated('/', {
                    templateUrl: 'views/home.html',
                    controller: 'MainController'
                })
                .when('/twitter', {
                    templateUrl: 'views/twitter.html',
                    controller: 'TwitterController'
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
                .whenAuthenticated('/profile', {
                    templateUrl: 'views/profile.html',
                    controller: 'ProfileController'
                })
                //TODO: implementera felhantering
                .when('/404', { 
                    templateUrl: 'views/404.html', 
                    controller: 'NotFoundErrorCtrl' 
                })
                .when('/apierror', {
                    templateUrl: 'views/apierror.html', 
                    controller: 'ApiErrorCtrl' 
                })
                .otherwise({redirectTo: '/'});
        // to configure how the application deep linking paths are stored.
        $locationProvider.html5Mode(true); 

       // $httpProvider.interceptors.push('processErrorHttpInterceptor');
}]);
