angular.module('AuthService', []).factory('AuthService', ['$rootScope', '$http', '$location', 
	function($rootScope, $http, $location) {
	//Every application has a single root scope. All other scopes are descendant scopes of the root scope. Scopes 
	var user = {
	    isAuthenticated: false,
		data: {}
	};
 
    $rootScope.user = user;

    return {
        isAuthenticated : function () {
            return user.isAuthenticated; 
        },
        login : function (loginModel) {
            var loginResponse = $http.post('/loginUser', loginModel); 
            loginResponse.then(function (response) {
                var data = response.data; 

                if (data.loginOk === true){
                    user.isAuthenticated = true;
                    user.data = data.user; 
                    $location.path('/profile'); 
                }
            });
        },
        logout : function () {
            user = {
                    isAuthenticated: false,
                    data: {}
                };
            $http.get('/logout').then(function(){
                $location.path('/'); 
            }); 
        },
        register : function (registerModel) {


        },
        getUserProfile : function(){
            $http.get('/userprofile')
            .then(function (response) {
                console.log(response); 
                var data = response.data; 
                if (data.loginOk === true){
                    user.isAuthenticated = true;
                    user.data = data.user;
                }
            });
        }
    };

}]
);