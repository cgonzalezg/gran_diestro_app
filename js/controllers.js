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

  $scope.rutas = Norte.all();
})
.controller('mapaCtrl', function($scope, $state, $cordovaGeolocation, ruta) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  $scope.ruta=ruta;
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(ruta.inicio.cordinates[0], ruta.inicio.cordinates[1]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: ruta.name
    });
    var mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var kmzLayer = new google.maps.KmlLayer(ruta.ruta);
    kmzLayer.setMap(map);
    console.log(kmzLayer);
    $scope.map = kmzLayer;
  }, function(error){
    console.log("Could not get location");
  });
})

.controller('descripcionCtrl', function($scope, ruta) {
  $scope.ruta = ruta;
})

.controller('desnivelCtrl', function($scope, ruta) {
  $scope.ruta = ruta;
});
