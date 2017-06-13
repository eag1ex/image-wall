'use strict';
describe('mock data flickr API', function () {

    var mokdata;
    var $httpBackend;
    var $q;
    var $http;
    var $rootScope;

    var params = function () {
        var para = {
            method: "flickr.photos.search",
            api_key: "6b3ba270b79a1093af80e49af575df5e",
            text: "face portrait people smile",
            tags: "portrait,mug",
            content_type: 1,
            media: "photos",
            extras: 'url_s',
            format: "json",
            nojsoncallback: 1,
            orientation: "square",
            per_page: 250
        }
        var array = [];
        for (var key in para) {
            array.push(encodeURIComponent(key) + "=" + encodeURIComponent(para[key]));
        }
        return array.join("&");
    }
    var url = 'https://1api.flickr.com/services/rest?' + params();

    beforeEach(function () {
        module('app');
        module('app.mockData');

        inject(function (myMockData, _$httpBackend_, _$q_, _$http_, _$rootScope_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            mokdata = myMockData;
            $q = _$q_;
            $http = _$http_;
            $httpBackend.verifyNoOutstandingRequest();
            
        $httpBackend.when('GET', url)
            .respond(200,{ userId: 'userX' }, { 'A-Token121': 'xxx' });
        });

            
    }); 
 
    afterEach(function () {
         $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
       
    })
 
    it('should make a GET call to retrieve 250 images', function () {
        var response;
        var Data = { userId: 'userX', 'A-Token': 'xxx' };
        $httpBackend.expectGET(url).respond(200,Data);
        $httpBackend.flush();       
        mokdata.data();
    })
});