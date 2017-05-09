module app.layout {
  'use strict';

  export class LayoutController {
    static $inject: Array<string> = ['$scope', 'mockData', "$timeout"];
    public imageData: any;
    public hotSpotImgs:any;
    constructor(public scope: any, private mockData: any, public timeout: any) {


      mockData.data().then((data) => {
        this.imageData = data.photos.photo;
        console.log('this.imageData', this.imageData)
      }, (error) => {
        //   console.log('category data not available', error)
      })

      this.hotSpotImgs={
        one:[],
        two:[]
      }

      this.hotSpot();

    }


    hotSpot() {
      var middleMatch = false;
      var findMiddle = () => {

        var wrapWidth = $('#flex-wrap').width();
        var imgWidth = $('#flex-wrap').find('img:first').width();
        wrapWidth = Math.floor(wrapWidth / imgWidth) * imgWidth;
        var windowHeight = $(window).height();
        var imgHeight = $('#flex-wrap').find('img:first').height();
        var image_per_row = Math.floor(wrapWidth / imgWidth);
        var image_row_middle = Math.floor((wrapWidth / imgWidth) / 2);

        var window_x_midl = image_row_middle;
        var window_y_midl = image_row_middle;


        /////hot stop, find imagelocation
        var imageHot_x = window_x_midl * imgWidth;
        var imageHot_y = Math.round(window_y_midl * imgHeight);

        var imgs = $('#flex-wrap').find('img');

        angular.forEach(imgs, (elm, inx) => {
          var elmX = $(elm).offset().left;
          var elmY = $(elm).offset().top;
    
          // first 2 boxes of 1
          if (elmX >= imageHot_x && elmY >= imageHot_y && middleMatch == false) {
            var offset = image_per_row;
            console.log(imgs[inx - 1 - offset * 3], imgs[inx - offset * 3]);
            console.log(imgs[inx - 1 - offset * 2], imgs[inx - offset * 2]);
            this.hotSpotImgs.one=[
              inx - 1 - offset * 3,//box
              inx - offset * 3,//box
              inx - 1 - offset * 2,//box
              inx - offset * 2//box
            ]
            console.log(imgs[inx + 1 - offset], imgs[inx + 2 - offset]);
            console.log(imgs[inx + 1], imgs[inx + 2]);

             this.hotSpotImgs.two=[
              inx + 1 - offset,//box
              inx + 2 - offset,//box
              inx + 1,//box
              inx + 2//box
            ]

            console.log('image_per_row', image_per_row)
            

            middleMatch = true;
            return;
          }

        })
      }// end find middle

         // initialize on load
         // wait for signal, once all images are loaded then lookup center
       this.scope.$on("imagesLoaded", (evt, data) => {
         
             findMiddle();
             console.log('got on imagesLoaded')
        });


      $(window).on('resize', function () {
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
