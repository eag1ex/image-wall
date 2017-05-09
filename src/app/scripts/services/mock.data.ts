module app.mockData {
    'use strict';

    export class MockData {
        static $inject: Array<string> = ['$q', "$http"];

        /* @ngInject */
        constructor(private q: any, private $http) {
        }

        public data() {
            return this.imageList();
        }

        private imageList() {
            var para = {
                method: "flickr.photos.search",
                api_key: "6b3ba270b79a1093af80e49af575df5e",                            
                text: "face portrait people smile",
                tags:"portrait,mug",
                content_type: 1,
                media: "photos",
                extras: 'url_s',
                format: "json",
                nojsoncallback: 1,
                orientation: "square",
                per_page:250
            }

            return this.$http({
                params: para,
                method: 'GET',
                url: 'https://api.flickr.com/services/rest'

            }).then((response) => {
                console.log('response.data',response.data)
                return response.data;
            }, (response) => {
                alert('api error, api key expired');
                console.log('response',response)
                return response;
            });
        }
    }

    angular
        .module('app.mockData', []);

    angular
        .module('app.mockData')
        .service('mockData', MockData)
}