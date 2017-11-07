myApp.controller("commuteMapController", ['$scope', '$state', 'uiGmapGoogleMapApi', commuteMapController]);

function commuteMapController($scope, $state, uiGmapGoogleMapApi){
	  $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {}};
        $scope.polylines = [];
        uiGmapGoogleMapApi.then(function(){
          $scope.polylines = [
            {
                id: 1,
                path: [
                    {
                        latitude: 45,
                        longitude: -74
                    },
                    {
                        latitude: 30,
                        longitude: -89
                    },
                    {
                        latitude: 37,
                        longitude: -122
                    },
                    {
                        latitude: 60,
                        longitude: -95
                    }
                ],
                stroke: {
                    color: 'red',
                    weight: 3
                },
                editable: false,
                draggable: false,
                geodesic: true,
                visible: true,
                icons: []
            },
            {
                id: 2,
                path: [
                    {
                        latitude: 47,
                        longitude: -74
                    },
                    {
                        latitude: 32,
                        longitude: -89
                    },
                    {
                        latitude: 39,
                        longitude: -122
                    }
                ],
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: false,
                draggable: false,
                geodesic: true,
                visible: true,
                icons: [{
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                    },
                    offset: '25px',
                    repeat: '50px'
                }]
            }
        ];
        });
}