angular.module('AuthService', []).factory('AuthService', ['$rootScope', '$http', '$window', 
	function($rootScope, $http, $window) {
	//Every application has a single root scope. All other scopes are descendant scopes of the root scope. Scopes 
	var user = {
	    isAuthenticated: false,
		email: '' //El email
	};
 
    $rootScope.user = user;

    var authService = {};

    authService.init = function (isAuthenticated, email) {
        user.isAuthenticated = isAuthenticated;
        user.email = email;
    };

    authService.isAuthenticated = function () {
        $http.get('/profile').then(function(response){
            return user.isAuthenticated || (typeof response.data.user !== "undefined"); 
        })
    };

    authService.login = function (loginModel) {
        var loginResponse = $http.post('/loginUser', loginModel); 
        loginResponse.then(function (response) {
            var data = response.data; 
            user.isAuthenticated = data.loginOk;

            if (data.loginOk === true){
                user.email = loginModel.email;
              //  $window.location.href = '/';
            }
        });
        //return loginResponse;
    };

    authService.logout = function () {

    };

    authService.register = function (registerModel) {


    };

    return authService;
}]
);