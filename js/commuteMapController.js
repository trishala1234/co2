myApp.controller("commuteMapController", ['$scope', '$state', 'uiGmapIsReady', commuteMapController]);

function commuteMapController($scope, $state, uiGmapIsReady){
		$scope.checkMap = function(){
			jQuery("#mapDetailsModal").show();
		}

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
		        var modeSelector = document.getElementById('mode-selector');
		        this.directionsService = new google.maps.DirectionsService;
		        this.directionsDisplay = new google.maps.DirectionsRenderer;
		        this.directionsDisplay.setMap(map);

		        var originAutocomplete = new google.maps.places.Autocomplete(
		            originInput, {placeIdOnly: true});
		        var destinationAutocomplete = new google.maps.places.Autocomplete(
		            destinationInput, {placeIdOnly: true});

		        this.setupClickListener('changemode-bus', 'BUS');
		        this.setupClickListener('changemode-train', 'TRAIN');
		        this.setupClickListener('changemode-driving', 'DRIVING');

		        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
		        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

		        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
		        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
		        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      }

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
        	//this.directionsDisplay.setMap(null);
        	if(mode === "BUS"){
        		me.travelMode = 'TRANSIT';
          		me.transitOptions = {modes: ['BUS']};
        	}
          	else if(mode === "TRAIN"){
          		me.travelMode = 'TRANSIT';
          		me.transitOptions = {modes: ['TRAIN']};
          	}
          	else if(mode === "DRIVING"){
          		me.travelMode = 'DRIVING';
          		//me.transitOptions = {modes: ['']};
          	}
          me.route();
        });
      };

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

      var directionsCollection = [];
      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        for(var i=0; i<directionsCollection.length; i++){
        	directionsCollection[i].setMap(null);
        }

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode,
          transitOptions: this.transitOptions,
          provideRouteAlternatives:true,
          optimizeWaypoints:true
        }, function(response, status) {
          if (status === 'OK') {

          	 for (var i = 0, len = response.routes.length; i < len; i++) {
		          var obj=new google.maps.DirectionsRenderer({
		            map: me.map,
		            directions: response,
		            routeIndex: i,
					polylineOptions:{
		    		strokeColor: '#0000FF',
		    		strokeOpacity: 0.8,
		    		strokeWeight: 6
		    		}
		          });	  
		          directionsCollection.push(obj);
        }


            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };

      new AutocompleteDirectionsHandler(map);
        });
}