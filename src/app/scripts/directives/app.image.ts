module app.image {
  'use strict';
  export class ImageController {
    public imgdata: any;
    public $onChanges: any
    public imgDATA: any
    public hotImage: any;
    public dataCheck: any;
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

      this.hotImage = false;

      this.$onChanges = (changes) => {
        //reset
        element.find('img').css({ opacity: 1 });
        this.hotImage = false;

        if (changes.imgdata) {
          if (!angular.isDefined(changes.imgdata.currentValue)) return;
          var imageData = changes.imgdata.currentValue;
          var matchindex = changes.imgdata.currentValue.matchindex;

          this.dataCheck = imageData;

          // once the images are loaded we expect to recive a matching index
          if (matchindex == true) {
            this.hotImage = true;
            element.find('img').css({ opacity: 0.3 })
          }

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
        }//changes.imgdata

      }//$onChanges

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
