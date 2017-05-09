module app.layout {
  'use strict';

  export class LayoutController {
    static $inject: Array<string> = ['$scope', 'mockData', "$timeout", "$rootScope"];
    public imageData: any;
    public hotSpotImgs: any;
    public imageModels: any;
    constructor(public scope: any, private mockData: any, public timeout: any, public rootScope: any) {


      mockData.data().then((data) => {
        this.imageData = data.photos.photo;
      }, (error) => {
        //   console.log('category data not available', error)
      })

      this.imageModels = {}
      this.hotSpot();

    }


    hotSpot() {

      var findMiddle = () => {
        console.log('running findMiddle')
        var wrapWidth = $('#flex-wrap').width();
        var imgWidth = $('#flex-wrap').find('img:first').width();
        wrapWidth = Math.floor(wrapWidth / imgWidth) * imgWidth;
        console.log('wrapWidth', wrapWidth)
        var windowHeight = $(window).height();
        var imgHeight = $('#flex-wrap').find('my-image:first').height();
        var image_per_row = Math.floor(wrapWidth / imgWidth);
        var image_row_middle = Math.floor((wrapWidth / imgWidth) / 2);

        var window_x_midl = image_row_middle;
        var window_y_midl = Math.floor((windowHeight / imgHeight) / 2);

        console.log('image_per_row', image_per_row)
        console.log('image_row_middle', image_row_middle)
        /////hot stop, find imagelocation
        var imageHot_x = window_x_midl * imgWidth;
        var imageHot_y = Math.round(window_y_midl * imgHeight);
        console.log('imageHot_x', imageHot_x)
        console.log('imageHot_y', imageHot_y)
        var middleMatch = false;
        var imgs = $('#flex-wrap').find('img');

        /**
         * we need to generate index first or it won update values in order
         */
        angular.forEach(imgs, (elm, inx) => {
          this.imageModels[inx] = null;
        })

        angular.forEach(imgs, (elm, inx) => {
          var elmX = $(elm).offset().left;
          var elmY = $(elm).offset().top;

          if (elmX >= imageHot_x && elmY >= imageHot_y && middleMatch == false) {

            this.scope.$apply(() => {
              this.rootScope.angularLoader = 1; // hide preloading icon
              var offset = image_per_row;

              // setting box 1
              this.imageModels[(inx - 1) - (offset * 3)] = 0;
              this.imageModels[inx - (offset * 3)] = 1;
              this.imageModels[(inx - 1) - (offset * 2)] = 2;
              this.imageModels[inx - (offset * 2)] = 3;

              // setting box 2
              this.imageModels[(inx + 1) - offset] = 4;
              this.imageModels[(inx + 2) - offset] = 5;
              this.imageModels[inx + 1] = 6;
              this.imageModels[inx + 2] = 7;
              middleMatch = true;
              //  console.log(imgs[(inx - 1) - (offset * 3)])
              // console.log(imgs[inx - (offset * 3)])  
              //console.log(imgs[(inx - 1) - (offset * 2)])    
              //console.log(imgs[(inx - 1) - (offset * 2)])      
            });

            return;
          }

        })
      }// end find middle

      // initialize on load
      // wait for signal, once all images are loaded then lookup center
      var loaded = false;
      this.scope.$on("imagesLoaded", (evt, data) => {
        if (!loaded) {
          findMiddle();
          loaded = true;
        }


      });


      $(window).on('resize', () => {
        findMiddle();
      });

    }//


  }
  angular
    .module('app.layout', []);

  angular
    .module('app.layout')
    .controller('layoutController', LayoutController);
}
