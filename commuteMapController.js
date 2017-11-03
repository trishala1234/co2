myApp.controller("commuteMapController", ['$scope', '$state', commuteMapController]);

function commuteMapController($scope, $state){
	$scope.initialise = function(){
		var map = new google.maps.Map(document.getElementById('mapContainer'), {
			center:{lat: -34.397, lng:150.644},
			zoom:8
		});

		//google.maps.event.addDomListener(window, 'load', $scope.initialise);
	}
	google.maps.event.addDomListener(window, 'load', $scope.initialise);
}