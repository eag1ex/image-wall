module app.image {
  'use strict';
  export class ImageController {
    public imgdata: any;
    public $onChanges: any
    public imgDATA: any
    public hotImage: any;
    static $inject: Array<string> = ['$scope', '$element', '$document', '$timeout', '$q', 'mockData'];

    /**
     * "myImage" COMPONENT decides what to load on canvas,  based on data received
     *  "hotBoxImages" make up the center displayed on canvas
     *  
     *  there are 8 matching indexes, 4 indexes per hotBox
     * 
     */


    /* @ngInject */
    constructor(
      public scope: any,
      public element: any,
      public document: any,
      public timeout: any,
      public q: any,
      public mockData: any
    ) {

      this.hotImage = null;

      this.$onChanges = (changes) => {
        this.hotImage = null;

        if (changes.imgdata) {
          if (!angular.isDefined(changes.imgdata.currentValue)) return;
          var imageData = changes.imgdata.currentValue;
          var matchindex = changes.imgdata.currentValue.matchindex;

          //  image url data received here
          this.imgDATA = imageData.item;

          // once the images are loaded we expect to recive a matching index
          if (matchindex !== null && matchindex <= 8) {

            var path = 'dist/images'
            var hotBoxImages = [
              path + '/box1/be-kind_01_01.gif',
              path + '/box1/be-kind_01_02.gif',
              path + '/box1/be-kind_01_03.gif',
              path + '/box1/be-kind_01_04.gif',
              path + '/box2/your-logo_01.gif',
              path + '/box2/your-logo_02.gif',
              path + '/box2/your-logo_03.gif',
              path + '/box2/your-logo_04.gif'
            ];
            this.hotImage = hotBoxImages[matchindex];
          }

          if (imageData.totalinx == imageData.inx) {

            /**
             *  delay required for images to fully load
             *  once last image is loaded we emit signal to layoutController to start initiating/defind center blocks
             */

            element.find('img')[0].onload = () => {

              timeout(() => {
                scope.$emit("imagesLoaded", { data: true });
                console.info('last image loaded!')
              }, 500)
            };

            // even if error we dont want this to hang
            element.find('img')[0].onerror = () => {

              timeout(() => {
                scope.$emit("imagesLoaded", { data: true });
                console.info('last image loaded!')
              }, 500)
            }
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
    template = TEMPLATE();
    controller = ImageController;
  }

  angular
    .module('app.image', []);
  angular
    .module('app.image').component('myImage', new ImageComponent());


function TEMPLATE(){
  var output=`
<img ng-src="{{vm.imgDATA.url_s}}" alt="{{vm.imgDATA.title}}" ng-show="vm.hotImage==null"/>
<span class='hotImage' style='background-image:url("{{vm.hotImage}}")' ng-show="vm.hotImage!==null"></span>
`;
return output;;
}



}
