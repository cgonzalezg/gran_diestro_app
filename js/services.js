angular.module('app.services', [])

.factory('BlankFactory', [function() {

}])

.factory('Norte', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var norte = [{
        "id": 1,
        "inicio": {
          "name": "Entrada de \"El Monreal\" junto al Camino de Sacedón.",
          "cordinates": [40.358146, -3.931861]
        },
        "fin": {
          "name": "Entrada de \"El Monreal\" junto al Camino de Sacedón.",
          "cordinates": [0, 0]
        },
        "ruta": "https://docs.google.com/uc?export=download&id=0B4ClGv_KOK5bV2xSYTRwdjA1eTcxRGFhYzI5eHpvTHFia3NV",
        "distance": 3000,
        "dificultad": "facil",
        "name": "el monreal",
        "perfil": "Irregular, con una subida mantenida de aproximadamente 1,5 km.",
        "superficie": "100 camino",
        "desnivel": "img/desnivel_1.png",
        "mapa": "img/mapa_1.png",
        "observaciones": "Una buena ruta circular en la que disfrutaremos de la gran belleza de este singular paraje natural que discurre entre encinas, pinos, alcornoques y jaras ,también posee un centro de GREFA para la recuperación del cernicalo. La distancia que hay desde la zona urbana a \"El Monreal\" puede ser aprovechada para realizar el calentamiento previo. Para llegar a esta ruta debemos partir desde la calle Cueva de la Mora y cruzar el puente de la carretera M-506. Al cruzarlo, encontraremos una bifurcación donde están los carteles informativos de las rutas del Parque Regional. En este punto, tomaremos el camino de la derecha (Avenida Villaviciosa de Asturias), más adelante tomaremos el camino que sale a mano derecha. Continuaremos por dicho camino hasta el siguiente que podamos girar a mano izquierda (Camino de Sacedón) y continuaremos por el mismo hasta llegar a la entrada de El Monreal, lugar donde comenzaremos nuestro circuito. El punto de agua más accesible está situado junto al parque canino localizado en el anillo ciclista."
      }, {
        "id": 2,
        "inicio": {
          "name": "Comienzo Ruta senderista",
          "cordinates": [40.353021, -3.924219]
        },
        "fin": {
          "name": "Comienzo Ruta senderista",
          "cordinates": [0, 0]
        },
        "ruta":"https://docs.google.com/uc?export=download&id=0B4ClGv_KOK5bZW1fSU9ZZ2swT2MwQ0phcW1tU2hiQWxUTnpr",
        "distance": 8330,
        "dificultad": "Moderada-dificil",
        "name": "Las dos sierras",
        "perfil": "Muy irregular, destacando la cuesta del Guadarrama a \"El Monreal\"",
        "superficie": "100 camino",
        "desnivel": "img/desnivel_2.png",
        "mapa": "img/mapa_1.png",
        "observaciones": "Magnífica ruta que pondrá a prueba nuestro aguante en las cuestas . Rodaremos por el singular paraje natural de ?El Monreal?y por la zona del río Guadarrama , que forma parte del Parque Regional del Curso Medio del río Guadarrama y su entorno .Destacan las vistas de la Sierra de Guadarrama y las estribaciones de Gredos que, mezcladas con el atardecer, serán un regalo para nuestra retina. Para llegar a esta ruta debemos partir desde la calle Cueva de la Mora y cruzar el puente de la carretera M-506. Al cruzarlo encontraremos una bifurcación donde están los carteles informativos de las rutas del Parque Regional . En este punto tomaremos el camino de la derecha y comenzaremos el circuito. El punto de agua más accesible está situado junto al parque canino localizado en el anillo ciclista."
      }



    ];

    return {
      all: function() {
        return norte;
      },
      remove: function(chat) {
        norte.splice(norte.indexOf(chat), 1);
      },
      get: function(rutaId) {
        for (var i = 0; i < norte.length; i++) {
          if (norte[i].id === parseInt(rutaId)) {
            return norte[i];
          }
        }
        return null;
      }
    };
  })
  .service('BlankService', [function() {

  }]);
