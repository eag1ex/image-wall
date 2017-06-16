module app.layout {
  'use strict';

  export class LayoutController {
    static $inject: Array<string> = ['$scope', 'myMockData', "$timeout", "$rootScope"];
    public imageData: any;
    public imageDataErrorMessage: any;
    public wallLoaded: any;
    public hotSpotImgs: any;
    public imageModels: any;
    constructor(public scope: any, private myMockData: any, public timeout: any, public rootScope: any) {

      /**
       * 
       * DATA is send to "myimage" component, and decides how to handle the image.
       * 
       */


      myMockData.data().then((data) => {
        if (data == false) {
          this.imageData = false;
          this.imageDataErrorMessage = "Invalid API key, or expired!";
          this.rootScope.angularLoader = 1; // hide preloading icon  
          console.info('Invalid API key, or expired!');
        }
        if (data.status == -1) {
          this.imageData = false;
          this.rootScope.angularLoader = 1; // hide preloading icon  
          this.imageDataErrorMessage = "connection error, no internet, or wrong API? ";
          console.info('connection error, no internet, or wrong API?');

        } else {
          this.imageData = data.photos.photo;
          console.info('flickr data found');
          console.log('this.imageData',this.imageData)
        }

      }, (error) => {
        this.imageData = false;
        this.rootScope.angularLoader = 1; // hide preloading icon  
        this.imageDataErrorMessage = "connection error, no internet? " + error;
        console.log('connection error, no internet?', error);
      })
      this.wallLoaded = false;
      this.imageModels = {}
      this.hotSpot();
    }


    hotSpot() {
      var findMiddleLoaded_once = false;

      var findMiddle = () => {

        /**
         * logic for definding canvas center.
         * we defind the center and offset positions using index within 1 loop cycle.
         */

        var wrapWidth = $('#flex-wrap').width();
        var imgWidth = $('#flex-wrap').find('img:first').width() || 60;

        wrapWidth = Math.floor(wrapWidth / imgWidth) * imgWidth;

        var windowHeight = $(window).height();
        var imgHeight = $('#flex-wrap').find('my-image:first').height();

        var image_per_row = Math.floor(wrapWidth / imgWidth);
        var image_row_middle = Math.floor((wrapWidth / imgWidth) / 2);

        var window_x_midl = image_row_middle;
        var window_y_midl = Math.floor((windowHeight / imgHeight) / 2) + 2;

        var imageHot_x = window_x_midl * imgWidth;
        var imageHot_y = Math.round(window_y_midl * imgHeight);

        var middleMatch = false;
        var imgs = $('#flex-wrap').find('img');

        /**
         * we need to generate imageModels(myimage) index first or it wont update values in order
         */
        angular.forEach(imgs, (elm, inx) => {
          this.imageModels[inx] = null;
        })

        angular.forEach(imgs, (elm, inx) => {

          var elmX = $(elm).offset().left;
          var elmY = $(elm).offset().top;

          if (elmX >= imageHot_x && elmY >= imageHot_y && middleMatch == false) {

            this.scope.$apply(() => {
              var offset = image_per_row;

              // setting box 1
              this.imageModels[(inx - 2) - (offset * 3)] = 0;
              this.imageModels[(inx - 1) - (offset * 3)] = 1;
              this.imageModels[(inx - 2) - (offset * 2)] = 2;
              this.imageModels[(inx - 1) - (offset * 2)] = 3;

              // setting box 2
              this.imageModels[(inx) - offset] = 4;
              this.imageModels[(inx + 1) - offset] = 5;
              this.imageModels[inx] = 6;
              this.imageModels[inx + 1] = 7;
              middleMatch = true;

              //console.log(imgs[(inx - 1) - (offset * 3)])
              //console.log(imgs[inx - (offset * 3)])  
              //console.log(imgs[(inx - 1) - (offset * 2)])    
              //console.log(imgs[(inx - 1) - (offset * 2)])

              if (findMiddleLoaded_once == false) {
                this.rootScope.angularLoader = 1; // hide preloading icon               
                console.info('image wall preloaded');
                findMiddleLoaded_once = true;
              }

            });
            return;
          }

        })
      }// end find middle

      // initialize on load
      // wait for signal, once all images are loaded then lookup center
      // also need to wait once dom has loaded, since there are many images!!

      var imagesLoaded = false;
      this.scope.$on("imagesLoaded", (evt, data) => {
        if (imagesLoaded == false) {
          $(window).resize();
          imagesLoaded = true;
        }
      });

      $(window).on('resize', () => {
        findMiddle();
        console.info('image wall resized');
      });
    }//
  }
  angular
    .module('app.layout', []);

  angular
    .module('app.layout')
    .controller('layoutController', LayoutController);
}
