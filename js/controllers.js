angular.module('app.controllers', [])

.controller('presentacionCtrl', function($scope) {

})

.controller('consejosCtrl', function($scope) {

})

.controller('leyendaCtrl', function($scope) {

})

.controller('zonaSurYOesteCtrl', function($scope) {

})

.controller('zonaNorteYEsteCtrl', function($scope, Norte) {
  Norte.all(function(data) {
    data.forEach(function(item) {
      // google.load('visualization', '1.0', {'packages':['corechart']});
      // google.setOnLoadCallback(function(){
      //     drawCart(item);
      // });
      drawCart(item, true);

      // ;
    });
    $scope.rutas = data;
  });
})

.controller('mapaCtrl', function($scope, $state, $cordovaGeolocation, ruta, Norte) {
  var options = {
    timeout: 10000,
    enableHighAccuracy: true
  };

  console.log('ruta', ruta);
  Norte.get(ruta, function(data) {
    $scope.ruta = data;
    var latLng = new google.maps.LatLng(data.ruta_coor[0].lat, data.ruta_coor[0].lon);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: data.name
    });
    var path = data.ruta_coor.map(function(coor) {
      return {
        lat: coor.lat,
        lng: coor.lon
      };
    });
    var mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    new google.maps.Polyline({
      path: path,
      strokeColor: '#0000CC',
      opacity: 0.4,
      map: map
    });
    // $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
    //
    //
    // }, function(error) {
    //   console.log("Could not get location");
    // });
  });

})

.controller('descripcionCtrl', function($scope, ruta, Norte) {


  Norte.get(ruta, function(data) {
    drawCart(data);
    $scope.ruta = data;
  });
})

.controller('desnivelCtrl', function($scope, ruta) {

  // function getPath(elevator, callback) {

  $scope.ruta = ruta;
});


function drawCart(ruta, thumbnail) {
  var elevator = new google.maps.ElevationService();

  var path = ruta.ruta_coor.map(function(coor) {
    return {
      lat: coor.lat,
      lng: coor.lon
    };
  });

  console.log('coordinates', path.length, ruta.ruta_coor.length);
  elevator.getElevationAlongPath({
    'path': path,
    'samples': 500
  }, function(elevations, status) {
    console.log(elevations.length);
    if (status !== google.maps.ElevationStatus.OK) {
      // Show the error code inside the chartDiv.
      chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
        status;
      return;
    }
    // Create a new chart in the elevation_chart DIV.

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Sample');
    data.addColumn('number', 'Elevation');
    for (var i = 0; i < elevations.length; i++) {
      data.addRow(['', elevations[i].elevation]);
    }

    if (thumbnail) {
      var chart_thumbnail = new google.visualization.ColumnChart(document.getElementById('elevation_chart_thumbnail'));
      chart_thumbnail.draw(data, {
        height: 100,
        // bars: "horizontal",
        // axisTitlesPosition:'none',
        legend: 'none',
        axisColor: 'white',
        axisBackgroundColor: 'white',
        enableTooltip: false,
        axisFontSize: 0,
        showCategories: false // titleY: 'Elevation (m)'
      });
    } else {
      var chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));

      chart.draw(data, {
        height: 150,
        weight: 150,
        // bars: "horizontal",
        // axisTitlesPosition:'none',
        legend: 'none',
        axisFontSize: 10,
        showCategories: false,

      });
    }


    // callback();
    // Draw the chart using the data within its DIV.
    // callback(chart);
  });
}
