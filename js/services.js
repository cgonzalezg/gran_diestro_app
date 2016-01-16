angular.module('app.services', [])

.factory('BlankFactory', [function() {

  }])
  .factory("Rutas", function($firebaseArray) {
    var itemsRef = new Firebase("https://grandiestro.firebaseio.com/rutas");
    console.log(itemsRef);
    var rutas = {
      all: $firebaseArray(itemsRef),

      get: function(id) {
        for (var i = 0; i < this.all.length; i++) {
          if (this.all[i].id === parseInt(id)) {
            return this.all[i];
          }
        }
        return null;
      }
    };
    return rutas;
  })
  .factory('Norte', function($http, $q) {
    // Might use a resource here that returns a JSON array

    var deffered = $q.defer();
    var test = [];
    var state = {
      data: [],
      all: function(callback) {
        $http.get('js/rutas_coor.json').then(function(resp) {
          this.data = resp.data.rutas;
          test = resp.data.rutas;
          callback(resp.data.rutas);

        });

      },
      remove: function(chat) {
        this.data.splice(norte.indexOf(chat), 1);
      },
      get: function(rutaId, callback) {
        this.all(function(all_data) {
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
