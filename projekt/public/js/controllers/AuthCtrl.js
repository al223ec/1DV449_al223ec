angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'AuthService', 
	function($scope, AuthService) {

    $scope.tagline = 'login!';
    $scope.user = { email : "", password : "" }; 
    $scope.errorMessage = null; 

    $scope.login = function(){
    	console.log($scope.user); 
    	if($scope.loginForm.$valid === true){
	 		AuthService.login($scope.user, wrongLoginCredentials); 
 		}
    };

    $scope.register = function(){
    	if($scope.registerForm.$valid === true){
    		AuthService.register($scope.user, failedRegisterForm); 
    	}
    };

    function wrongLoginCredentials(){
    	$scope.errorMessage = "Felaktig inlogg! Vg försök igen!";
    };

    function failedRegisterForm(){
    	$scope.errorMessage = "Uppgifterna har inte kunnat registreras! Vg försök igen!";
    };
}]);
