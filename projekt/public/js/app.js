angular.module('twitterApp', [
	'ngRoute', 
	'ngAnimate',
	'ngDialog', //Tänkt att användas till att visa tweets från twitter men saknar tid att impementera
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
	    /*//Calling order 
		*	app.config()
		*	app.run()
		*	directive's compile functions (if they are found in the dom)
		*	app.controller()
		*	directive's link functions (again if found)
		*/
	})