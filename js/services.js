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
    },

    addLike: function(id) {
      itemsRef.child(id).child('likeCount').transaction(function(current_value) {
        return (current_value || 0) + 1;
      });
    },
    disLike: function(id) {
      itemsRef.child(id).child('likeCount').transaction(function(current_value) {
        return (current_value || 0) - 1;
      });
    }
  };
  return rutas;
})

.factory("Filtros", function() {
  return {
    facil: "Facil",
    dificil: "Moderada-dificil",
    moderada: "Moderada",
    distancia: 0
  };
});
