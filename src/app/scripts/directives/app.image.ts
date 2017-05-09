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
      var imageData;
      this.$onChanges = (changes) => {
        if (angular.isDefined(changes.imgdata.currentValue)) {
          imageData = changes.imgdata.currentValue;
          this.imgDATA = imageData.item;
          if (imageData.totalinx == imageData.inx) {

            /**
             * 
             * delay required for images to fully load
             * 
             */
            timeout(() => {
              scope.$emit("imagesLoaded", { data: true });
            }, 1000)
          }
        }

        // once the images are loaded we expect to recive a matching index
        // to loop throught

        if (angular.isDefined(changes.hotSpotImgs.currentValue)) {
          if (changes.hotSpotImgs.currentValue == null) return;

          // box one
          var inxData = changes.hotSpotImgs.currentValue;
          for (var i = 0; i < inxData.one.lenght; i++) {
            if (inxData.one[i] == imageData.inx) {
              console.log('we have mathich index!', element)
              return;
            }
          }
          // box two
          for (var i = 0; i < inxData.two.lenght; i++) {
            if (inxData.two[i] == imageData.inx) {
              console.log('we have mathich index!', element)
              return;
            }
          }

        }


      }

    }
  }

  class ImageComponent {
    bindings = {
      imgdata: "<",
      matchinx: "<"
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
