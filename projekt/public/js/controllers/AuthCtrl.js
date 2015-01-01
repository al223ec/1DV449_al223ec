angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'AuthService', 
	function($scope, AuthService) {

    $scope.tagline = 'login!';

    $scope.login = function(formData){
    	console.log("Logging in!"); 
 		AuthService.login(formData); 
    };
}]);
