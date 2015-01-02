angular.module('MainCtrl', []).controller('MainController', ['$scope', 'Map', function($scope, map) {
    $scope.tagline = 'To the moon and back!';

    map.create(); 
}]);
