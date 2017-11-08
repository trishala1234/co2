myApp.controller("commuteMapController", ['$scope', '$state', 'uiGmapIsReady', commuteMapController]);

function commuteMapController($scope, $state, uiGmapIsReady){
	  $scope.map = {control : {}, center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {}};
	  
        $scope.polylines = [];
       uiGmapIsReady.promise().then(function(map_instances){
       		debugger;
        	var map = $scope.map.control.getGMap();
        	var map2 = map_instances[0].map;

        	function AutocompleteDirectionsHandler(map) {
		        this.map = map;
		        this.originPlaceId = null;
		        this.destinationPlaceId = null;
		        this.travelMode = 'WALKING';
		        var originInput = document.getElementById('origin-input');
		        var destinationInput = document.getElementById('destination-input');
		        //var modeSelector = document.getElementById('mode-selector');
		        this.directionsService = new google.maps.DirectionsService;
		        this.directionsDisplay = new google.maps.DirectionsRenderer;
		        this.directionsDisplay.setMap(map);

		        var originAutocomplete = new google.maps.places.Autocomplete(
		            originInput, {placeIdOnly: true});
		        var destinationAutocomplete = new google.maps.places.Autocomplete(
		            destinationInput, {placeIdOnly: true});

		        //this.setupClickListener('changemode-walking', 'WALKING');
		        //this.setupClickListener('changemode-transit', 'TRANSIT');
		        //this.setupClickListener('changemode-driving', 'DRIVING');

		        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
		        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

		        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
		        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
		        //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      }

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });

      };

      var directionDisplays=[];
      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };

      new AutocompleteDirectionsHandler(map);

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