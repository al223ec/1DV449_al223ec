angular.module('AuthService', []).factory('AuthService', ['$rootScope', '$http', '$location', 
	function($rootScope, $http, $location) {
	//Every application has a single root scope. All other scopes are descendant scopes of the root scope. Scopes 
	var user = {
	    isAuthenticated: false,
		data: {} //El email
	};
 
    $rootScope.user = user;

    return {
        isAuthenticated : function () {
            return user.isAuthenticated; 
        },
        login : function (loginModel, failCallback) {
            var loginRequest = $http.post('/loginUser', loginModel)

            loginRequest.error(function(data, status, headers, config){
                if(data == "Unauthorized"){
                    //felaktiga uppgifter
                    console.log("felaktiga uppgifter"); 
                    failCallback(); 
                    $location.path('/login'); 
                }
            }); 

            loginRequest.then(function (response) {
                var data = response.data; 
                console.log(data); 

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
            return $http.post('/signup', registerModel); 
        },
        getUserProfile : function() {
            return $http.get('/userprofile').then(function (response) {
                var data = response.data; 
                if (data.loginOk === true){
                    user.isAuthenticated = true;
                    user.data = data.user;
                }

                return data; 
            });
        },
    }
}]);