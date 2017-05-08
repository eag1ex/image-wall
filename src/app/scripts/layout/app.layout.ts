module app.layout {
  'use strict';

  export class LayoutController {
    static $inject: Array<string> = ['$scope', 'mockData', "$timeout"];
    public imageData: any;
    constructor(public scope: any, private mockData: any, timeout) {


      mockData.data().then((data) => {
        this.imageData = data.photos.photo;
        console.log('this.imageData', this.imageData)
      }, (error) => {
        //   console.log('category data not available', error)
      })

        
        $(window).on('resize', function () {
          var wrapWidth = $('#flex-wrap').width();
          var windowHeight = $(this).height();
          var imgWidth = $('#flex-wrap').find('img:first').width();
          var imgHeight = $('#flex-wrap').find('img:first').height();
          var image_per_row = wrapWidth / imgWidth; 

          var window_x_midl = Math.round((wrapWidth/imgWidth)/2); 
          var window_y_midl = Math.round((windowHeight/imgHeight)/2); 
           

          /////hot stop, find imagelocation
          var imageHot_x= window_x_midl*imgWidth;
          var imageHot_y= Math.round(window_y_midl*imgHeight);
      //    console.log('imageHot_x, imageHot_y',imageHot_x, imageHot_y);

          var imgs = $('#flex-wrap').find('img');
          var is_match_middle = false;
          angular.forEach(imgs,(elm,inx)=>{
            var elmX = $(elm).offset().left;
             var elmY = $(elm).offset().top;
             if (elmX>=imageHot_x && elmY>=imageHot_y && is_match_middle==false){
               console.log(elmX,imageHot_x);
               console.log(elmY,imageHot_y);
                
              // console.log('match elm',elm)
               is_match_middle=true;
               return;
             }
          })

        })

    }

  }
  angular
    .module('app.layout', []);

  angular
    .module('app.layout')
    .controller('layoutController', LayoutController);
}
