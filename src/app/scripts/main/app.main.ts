module app.main {
  'use strict';
  export class MainController {
    public delivery: any;
    static $inject: Array<string> = ['$scope', '$element', '$document', '$timeout', '$q', 'mockData'];
    /* @ngInject */
    constructor(
      public scope: any,
      public element: any,
      public document: any,
      public timeout: any,
      public q: any,
      public mockData: any
    ) {
      console.info('main loaded');
      //init

        mockData.data().then((data) => {
          this.delivery = data.delivery;
          console.log('this.delivery', this.delivery)
        }, (error) => {
          //   console.log('category data not available', error)
        })
        window.onload=()=>{
          console.log('images loaded!')
        }
    }

  }

  class MainComponent {

    constructor() { }
    restrict = 'E';
    controllerAs = "vm";
    templateUrl = 'dist/js/app.main.html';
    controller = MainController;
  }

  angular
    .module('app.main', []);
  angular
    .module('app.main').component('main', new MainComponent());
}
