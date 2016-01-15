angular.module('app.services', [])

.factory('BlankFactory', [function() {

}])

.factory('Norte', function($http, $q) {
  // Might use a resource here that returns a JSON array

  var deffered = $q.defer();
  var test = [];
  var state = {
    data: [],
    all: function(callback) {
      $http.get('js/zona_norte.json').then(function(resp) {
        this.data=resp.data;
        test=resp.data;
        callback(resp.data);

      });

    },
    remove: function(chat) {
      this.data.splice(norte.indexOf(chat), 1);
    },
    get: function(rutaId, callback) {
      this.all(function(all_data){
        for (var i = 0; i < all_data.length; i++) {
          if (all_data[i].id === parseInt(rutaId)) {
             return callback(all_data[i]);
          }
        }
        callback();
      });

    }
  };
  // function ruta_data (callback) {


  // }
  return state;




});
