module app.image {
  'use strict';
  export class ImageController {
    public delivery: any;
    public imgdata: any;
    public $onChanges: any
    public imgDATA: any
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

      this.$onChanges = (changes) => {
        if (angular.isDefined(changes.imgdata.currentValue)) {
          this.imgDATA = changes.imgdata.currentValue;
        }
      }

    }

  }

  class ImageComponent {
    bindings = {
      imgdata: "<"
    }
    constructor() { }
    restrict = 'E';
    controllerAs = "vm";
    templateUrl = 'dist/js/app.image.html';
    controller = ImageController;
  }

  angular
    .module('app.image', []);
  angular
    .module('app.image').component('myImage', new ImageComponent());
}
