angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'AuthService', 
	function($scope, AuthService) {

    $scope.tagline = 'login!';
    $scope.user = { email : "", password : "" }; 

    $scope.login = function(){
    	console.log($scope.user); 
    	if($scope.loginForm.$valid === true){
	    	console.log("Logging in!"); 
	 		AuthService.login($scope.user, wrongLoginCredentials); 
 		}
    };

    $scope.register = function(formData){
    	console.log(formData); 
    	//AuthService.register(formData); 
    };

    function wrongLoginCredentials(){

    }
}]);
