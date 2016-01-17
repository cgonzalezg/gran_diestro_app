angular.module('app.controllers', [])

.controller('presentacionCtrl', function($scope) {

})

.controller('consejosCtrl', function($scope) {

})

.controller('leyendaCtrl', function($scope) {

})

.controller('zonaSurYOesteCtrl', function($scope) {

})


.controller('ModalCtrl', function($scope, $ionicActionSheet, Filtros) {
    $scope.hideModal = function() {
      console.log('que pasa');
      $scope.modal.hide();

      // Filtros.facil = $scope.facil;

    };
    $scope.removeModal = function() {
      console.log('estos@@');
      $scope.modal.remove();
    };
    $scope.facil = true;
    $scope.moderada = true;
    $scope.dificil = true;
    $scope.distancia = 0;

    $scope.setFilters = function(distance) {

      console.log('Set filters', distance);
      Filtros.distancia = distance;
      if ($scope.facil) Filtros.facil = 'Facil';
      else Filtros.facil = '*';
      if ($scope.moderada) Filtros.moderada = 'Moderada';
      else Filtros.moderada = '*';
      if ($scope.dificil) Filtros.dificil = 'Moderada-dificil';
      else Filtros.dificil = '*';
    };
    // setFilters($scope.facil);

  })
  .controller('zonaNorteYEsteCtrl', function($scope, $ionicFilterBar, $ionicModal, Rutas, $timeout, Filtros) {
    var filterBarInstance;
    var rutas = Rutas.all;
    console.log('filtros', Filtros);
    $scope.filtros = Filtros;
    $scope.openModal = function() {
      console.log('show modal', $scope.modalCtrl);
      console.log('show modal', Filtros);
      $scope.modalCtrl.show();

    };
    $scope.distanceFilter = 0;

    $scope.setFilters = function(item) {
      console.log(item.distance, Filtros.distancia);
      return item.distance >= Filtros.distancia && (item.dificultad === Filtros.facil ||
        item.dificultad === Filtros.moderada ||
        item.dificultad === Filtros.dificil);
    };

    $ionicModal.fromTemplateUrl('templates/desnivel.html', function(modal) {
      console.log('mierda', modal.facil);
      $scope.modalCtrl = modal;
    }, {
      animation: 'slide-in-up', //'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    });
    $scope.rutas = rutas;
    // $scope.searchText=;
    $scope.showFilterBar = function() {
      filterBarInstance = $ionicFilterBar.show({
        items: rutas,
        update: function(filteredItems, filterText) {
          var result = rutas;
          console.log(filterText, rutas.length);
          $scope.searchText = filterText;
        }
      });
    };

    $scope.showLikes = function(id) {
      if (!$scope.rutas[id].like) {

        return $scope.rutas[id].likeCount;
      } else {
        return;

      }
    };

    $scope.likeClick = function(id) {
      console.log($scope.rutas[id].like, $scope.rutas[id].likeCount);
      if (!$scope.rutas[id].like) {
        $scope.rutas[id].like = true;
        $scope.rutas[id].likeCount += 1;
        Rutas.addLike(id - 1);
      } else {
        $scope.rutas[id].like = false;
        $scope.rutas[id].likeCount -= 1;
        Rutas.disLike(id - 1);

      }
      return $scope.rutas[id].likeCount;
      // $scope.customStyle.colorClass = "green";
    };
    $scope.refreshItems = function() {
      if (filterBarInstance) {
        filterBarInstance();
        filterBarInstance = null;
      }

      $timeout(function() {
        getItems();
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };

  })

.controller('mapaCtrl', function($scope, $state, $cordovaGeolocation, ruta, Rutas) {
  var options = {
    timeout: 10000,
    enableHighAccuracy: true
  };

  console.log('ruta', ruta);
  $scope.ruta = Rutas.get(ruta);

  // $scope.ruta = data;
  var latLng = new google.maps.LatLng($scope.ruta.ruta_coor[0].lat, $scope.ruta.ruta_coor[0].lon);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: $scope.ruta.name
  });
  var path = $scope.ruta.ruta_coor.map(function(coor) {
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


})

.controller('descripcionCtrl', function($scope, ruta, Rutas) {

  var data = Rutas.get(ruta);
  drawCart(data);
  $scope.ruta = data;

})

.controller('desnivelCtrl', function($scope, ruta) {

  // function getPath(elevator, callback) {

  $scope.ruta = ruta.all;
});
var elevator = new google.maps.ElevationService();


function drawCart(ruta, thumbnail) {

  var path = ruta.ruta_coor.map(function(coor) {
    return {
      lat: coor.lat,
      lng: coor.lon
    };
  });

  // console.log('coordinates', path.length, ruta.ruta_coor.length);
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
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Sample');
    data.addColumn('number', 'Elevation');
    for (var i = 0; i < elevations.length; i++) {
      data.addRow(['', elevations[i].elevation]);
    }
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



    // callback();
    // Draw the chart using the data within its DIV.
    // callback(chart);
  });
}
