'use strict';
describe('mock data flickr API', function () {

    var mokdata;
    var $httpBackend;
    var $q;
    var $http;
    var $rootScope;

    var url = 'https://api.flickr.com/services/rest?api_key=6b3ba270b79a1093af80e49af575df5e&content_type=1&extras=url_s&format=json&media=photos&method=flickr.photos.search&nojsoncallback=1&orientation=square&per_page=250&tags=portrait,mug&text=face+portrait+people+smile';

    beforeEach(function () {
        module('app');
        module('app.mockData');
        module('app.image');
        
 
        inject(function (myMockData, _$httpBackend_, _$q_, _$http_, _$rootScope_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            mokdata = myMockData;
            $q = _$q_;
            $http = _$http_;


        });
        //  $rootScope.$apply();
    });

    afterEach(function () {
        // $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();

    })

    it('should make a GET call to retrieve 250 images', function () {
        var response;
        var Data = [{
            farm: 3,
            height_s: "240",
            id: "33269515672",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "148657467@N03",
            secret: "ac837801a8",
            server: "2835",
            title: "Autumn Smile",
            url_s: "https://farm3.staticflickr.com/2835/33269515672_ac837801a8_m.jpg",
            width_s: "228"
        }];

        /**
         * THIS DOES WORK, I HAD WROGN LOGIN WITHIN DATA OUTPUT
         */

        $httpBackend.when('GET', url)
            .respond(200, Data);

        mokdata.data().then(function (data) {
            response = data;
        }, function (error) {
            //response = error
        })

        $rootScope.$apply();

        $httpBackend.flush();
        expect(response).toBe('Data');
    })
});