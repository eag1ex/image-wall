'use strict';
describe('mock data flickr API', function () {

    var mokdata;
    var $httpBackend;
    var $q;
    var $http;

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

        inject(function (myMockData, _$httpBackend_, _$q_,_$http_) {
            $httpBackend = _$httpBackend_;
            mokdata = myMockData;
            $q = _$q_;
            $http = _$http_;
            $httpBackend.verifyNoOutstandingRequest();
        });

        $httpBackend.when('GET', url)
                            .respond({userId: 'userX'}, {'A-Token121': 'xxx'});
    });

    afterEach(function () {
         // $httpBackend.flush();
         // $httpBackend.verifyNoOutstandingRequest(); 
         //$httpBackend.verifyNoOutstandingExpectation();
    })

    it('should make a GET call to retrieve 250 images', function () {

    
        $httpBackend.expectGET(url).respond({userId: 'userX'}, {'A-Token': 'xxx'});
      mokdata.data();
        //$httpBackend.flush();

        

      //  var deferred = $q.defer();
       // mokdata.imageList().and.returnValue(deferred.promise);
      //  expect(mokdata.imageList()).toBe(deferred.promise);
        
      //   var  successCallback = jasmine.createSpy();
        // Create expectation
      //  $httpBackend.expectGET(url).respond(200, 'my data');
        
        // Call http service
      //  $http.get(url).then(successCallback);
        
        // callback called only after flush
     //   expect(successCallback).not.toHaveBeenCalled();
        
        // flush response
     //   $httpBackend.flush();
         //   errorCallback.calls.argsFor(0);
        // Verify expectations
      //  .calls.mostRecent().args;
        // Actual response is  [ 'mock data', 200, Function, { method : 'GET', url : '/path/to/resource' } ]
       // expect(successCallback.calls.mostRecent().args[0]).toContain('my data');
       // expect(successCallback.calls.argsFor(0)).toContain([{data: 'my data'}]); 

    })
    /*
        it('should make a GET call to retrieve a single book object', function () {
            $httpBackend.expectGET('/api/book/9').respond(200, {});
            booksService.getBook('9');
        });
    
        it('should make a POST call to create a new book', function () {
            var mockBook = { id: '111' };
            $httpBackend.expectPOST('/api/book/').respond(200, true);
            mockdata.data();
        });
    
        it('should make a PUT call to update an existing book object', function () {
            var mockBook = { id: '999' };
            $httpBackend.expectPUT('/api/book/999', mockBook).respond(200, true);
            booksService.saveBook(mockBook, mockBook.id);
        });
    
        it('should make a DELETE call to remove a book object', function () {
            $httpBackend.expectDELETE('/api/book/123').respond(200, true);
            booksService.deleteBook('123');
        });
        */
});