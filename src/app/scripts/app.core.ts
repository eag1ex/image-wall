module app {
  'use strict';
  angular.module('app.core', []);

  angular
    .module('app.core')
    .config(configureStates)
    .run(appRun)

  appRun['$inject'] = ['$rootScope','$timeout'];
  function appRun($rootScope,$timeout) {
       $rootScope.angularLoader=0;

        $rootScope.$on("$stateChangeSuccess", function(){       
          console.info('angular Loaded');
        });     
  }

  configureStates['$inject'] = ['$stateProvider', '$locationProvider', '$urlRouterProvider','$qProvider'];
  /* @ngInject */
  function configureStates($stateProvider, $locationProvider, $urlRouterProvider,$qProvider) {

    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    var states: any[] = getStates();
    states.forEach(function (state) {
      console.info('state> ',state.state)
      $stateProvider.state(state.state, state.config);
    });
  }
  function getStates(): any[] {

    return [
      {
        state: 'main',
        config: {
          url: '/',
          controller:'layoutController',
          controllerAs:'layout',
          templateUrl: 'dist/js/app.layout.html',
          title: 'main'
        }
      }
    ];
  }
}

