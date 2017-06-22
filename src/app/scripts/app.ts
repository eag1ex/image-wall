//avoid compailer error messages
declare var angular: any;
declare var WINDOW_PRELOADED:any;
declare var jquery:any;
declare var $:any;
module app {
  'use strict';
  angular.module('app', [
    // dependant
    'ui.router',
    'app.mockData',
    'app.core',
    'app.layout',
    'app.image',
    'app.buffer'
  ]);
}