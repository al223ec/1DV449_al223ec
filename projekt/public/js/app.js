angular.module('twitterApp', [
	'ngRoute', 
	'ngAnimate',
	'appRoutes', 
	'MainCtrl', 
	'TwitterCtrl', 
	'ProfileCtrl',
	'AuthCtrl',
	'AuthService',
	'AppService',	
	'MapService',
	]).run(['$location', '$rootScope', '$log', 'AuthService', '$route',
        function ($location, $rootScope, $log, AuthService, $route) {
  			$rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            	if (rejection && rejection.needsAuthentication === true) {
                	var returnUrl = $location.url();
                    $log.log('returnUrl=' + returnUrl);
                    $location.path('/login').search({ returnUrl: returnUrl });
                }
            });
 
    }])
	.config(function() {
	    console.log("app config");
	})