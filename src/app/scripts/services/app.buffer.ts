

module app.buffer {
    'use strict';

    export class Buffer {
        static $inject: Array<string> = ['$q', "$http", '$timeout'];

        /* @ngInject */
        constructor(private q: any, private $http, private timeout) {
            
        } 

        public go(data, interateFN, callback){
            var i =0, len = data.length;


            if(!data.length){
                console.log('data has no length');
                 return;
            }
            var _t = this;
            this.timeout(function execute(result){
                   
                for(var start=+new Date; i < len && result !== false && ((+new Date) -start <50); i++){
                    result = interateFN.call(data[i], data[i],i)
                  //  console.log(' result ', result )
                }
                
                if (i < len && result !== false) {
                   // console.log('continue looping ', i);
                    _t.timeout(execute.call(null,arguments), 20);// call again in iterate
                } else {
                    callback(data);
                   // console.log('load everything ',i)
                }
            },20)
        }
    }

    angular
        .module('app.buffer', []);

    angular
        .module('app.buffer')
        .service('buffer', Buffer)
}

/**
 * 
 * 

$(document).ready(function () {
        function buffer(items, iterFn, callback) {
            var i = 0, len = items.length;
            setTimeout(function () {
                var result;

                for (var start = +new Date; i < len && result !== false && ((+new Date) - start < 50); i++) {
                    result = iterFn.call(items[i], items[i], i);
                }

                if (i < len && result !== false) {
                    setTimeout(arguments.callee, 20);
                } else {
                    callback(items);
                }
            }, 20);
        }

        $.get('/home/data', function (result) {
            var html = '';

            buffer(result, function (item) {
                html += '<li>' + item + '</li>';
            }, function () {
                $('ul').append(html);
            });
        });
    });

 */