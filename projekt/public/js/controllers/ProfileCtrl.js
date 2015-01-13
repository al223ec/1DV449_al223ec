angular.module('ProfileCtrl', []).controller('ProfileController', 
	['$scope', '$rootScope', 'AuthService', function($scope, $rootScope, AuthService) {
    $scope.user = $rootScope.user; 
	console.log($scope.user);

	
    $scope.logout = function(){
    	AuthService.logout(); 
    };

    $scope.printUsr = function(){
    	console.log($scope.user); 
    }; 
}]);
