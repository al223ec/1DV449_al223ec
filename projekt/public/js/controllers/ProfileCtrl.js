angular.module('ProfileCtrl', []).controller('ProfileController', ['$scope', '$rootScope', 'AuthService', function($scope, $rootScope, AuthService) {
    $scope.user = $rootScope.user; 

}]);
