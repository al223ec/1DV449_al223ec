angular.module('TwitterCtrl', []).controller('TwitterController', ['$scope', '$rootScope', 
	function($scope, $rootScope) {
	$scope.user = $rootScope.user; 
}]);