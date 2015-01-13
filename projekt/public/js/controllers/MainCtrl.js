angular.module('MainCtrl', []).controller('MainController', ['$scope', 'Map', function($scope, map) {
    $scope.tagline = 'To the moon and back!';
    map.create(); 

    //Möjligt att detta är det fulaste jag gjort, tar bort scrollmöjligheten när man visar karatan
    $('html, body').css({
    	'overflow-y': 'hidden',
    	'height': '100%'
	});

    $scope.$on('$routeChangeStart', function(next, current) { 
    	$('html, body').css({
			'overflow-y': 'auto',
			'height': 'auto'
		});
	});
}]);
