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
                api_key: "7fd7aade6d970b8272ebde7c6753c258",
                text: "face portrait people smile",
                tags:"portrait,mug",
                content_type: 1,
                media: "photos",
                extras: 'url_s',
                format: "json",
                nojsoncallback: 1,
                orientation: "square",
            }

            return this.$http({
                params: para,
                method: 'GET',
                url: 'https://api.flickr.com/services/rest'

            }).then((response) => {
                return response.data;
            }, (response) => {
                console.log('error')
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