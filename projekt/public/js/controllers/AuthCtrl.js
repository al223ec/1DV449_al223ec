angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'AuthService', 
	function($scope, AuthService) {

    $scope.login = function(formData){
    	console.log("Logging in!"); 
 		AuthService.login(formData); 
    };
    $scope.register = function(formData){
    	AuthService.register(formData); 
    }
}]);
