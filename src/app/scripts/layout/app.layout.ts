module app.layout {
  'use strict';

  export class LayoutController {
    static $inject: Array<string> = ['$scope', 'mockData', "$timeout"];
    public imageData: any;
    public hotSpotImgs: any;
    public imageModels: any;
    constructor(public scope: any, private mockData: any, public timeout: any) {


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

        var wrapWidth = $('#flex-wrap').width();
        var imgWidth = $('#flex-wrap').find('img:first').width();
        wrapWidth = Math.floor(wrapWidth / imgWidth) * imgWidth;
        var windowHeight = $(window).height();
        var imgHeight = $('#flex-wrap').find('my-image:first').height();
        var image_per_row = Math.floor(wrapWidth / imgWidth);
        var image_row_middle = Math.floor((wrapWidth / imgWidth) / 2);

        var window_x_midl = image_row_middle;
        var window_y_midl = image_row_middle;


        /////hot stop, find imagelocation
        var imageHot_x = window_x_midl * imgWidth;
        var imageHot_y = Math.round(window_y_midl * imgHeight);
        var middleMatch = false;
        var imgs = $('#flex-wrap').find('img');

        /**
         * we need to generate index first or it won update values in order
         */
        angular.forEach(imgs, (elm, inx) => {
          this.imageModels[inx] = false;
        })

        angular.forEach(imgs, (elm, inx) => {
          var elmX = $(elm).offset().left;
          var elmY = $(elm).offset().top;

          // first 2 boxes of 1
          if (elmX >= imageHot_x && elmY >= imageHot_y && middleMatch == false) {

            this.scope.$apply(() => {
              var offset = image_per_row;

              // setting box 1
              this.imageModels[(inx - 1) - (offset * 3)] = true;
              this.imageModels[inx - (offset * 3)] = true;
              this.imageModels[(inx - 1) - (offset * 2)] = true;
              this.imageModels[inx - (offset * 2)] = true;
              
              // setting box 2
              this.imageModels[(inx + 1) - offset] = true;
              this.imageModels[(inx + 2) - offset] = true;
              this.imageModels[inx + 1] = true;
              this.imageModels[inx + 2] = true;
               middleMatch = true;
              
            });
              
            return;
          }

        })
      }// end find middle

      // initialize on load
      // wait for signal, once all images are loaded then lookup center
      this.scope.$on("imagesLoaded", (evt, data) => {
        findMiddle();
      });


      $(window).on('resize', () => {
          console.log('on resize??')
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
