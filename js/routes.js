angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('menu.presentacion', {
    url: '/presentacion',
    views: {
      'side-menu21': {
        templateUrl: 'templates/presentacion.html',
        controller: 'presentacionCtrl'
      }
    }
  })




  .state('menu', {
    url: '/side-menu21',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })




  .state('menu.consejos', {
    url: '/consejos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/consejos.html',
        controller: 'consejosCtrl'
      }
    }
  })





  .state('menu.leyenda', {
    url: '/leyenda',
    views: {
      'side-menu21': {
        templateUrl: 'templates/leyenda.html',
        controller: 'leyendaCtrl'
      }
    }
  })



  .state('menu.zonaNorteYEste', {
    url: '/norteeste',
    views: {
      'side-menu21': {
        templateUrl: 'templates/zonaNorteYEste.html',
        controller: 'zonaNorteYEsteCtrl',
      }
    }
  })





  .state('menu.mapa', {
    url: '/mapa/:id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mapa.html',
        controller: 'mapaCtrl',
        resolve: {
          ruta: function($stateParams) {
            return $stateParams.id;
          }
        }
      }
    }
  })
  .state('menu.desnivel', {
    url: '/desnivel/:id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/desnivel.html',
        controller: 'desnivelCtrl',
        resolve: {
          ruta: function($stateParams, Norte) {
            return Norte.get($stateParams.id);
          }
        }
      }
    }
  })
  .state('menu.descripcion', {
    url: '/descripcion/:id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/descripcion.html',
        controller: 'descripcionCtrl',
        resolve: {
          ruta: function($stateParams) {
            return $stateParams.id;
          }
        }
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/side-menu21/norteeste');

});
