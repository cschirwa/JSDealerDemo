

var app = angular.module('app', ['ngRoute']);
    var dealerData;
    app.controller('AppController', function ($scope) {
            $scope.message = "TestMessgae";
});
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/index.html',
            controller: 'LoginController'
        }).when("/dealer", {
            templateUrl: '/dealer.html',
            controller: 'DealerController'
        });
    }]);

    app.controller('LoginController',function($scope) {
    $scope.credentials = {
        username:"Controllers",
        password :"Controllers in action"
    }
    });

    app.controller('DealerController',function($scope, $http) {
        try {
            $http.get("https://api.bmw.co.za/webcontact/v1/dealer").then(function(response){
                $scope.dealerData = response.data;
            })
        } catch (err){
            console.log("Failed to fetch data: " + err);
        }
});

// 'use strict';
//
// angular.module('myApp', [
//     'ngRoute',
//     'login.view1',
//     'dealer.view2'
// ]).
// config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
//     $locationProvider.hashPrefix('!');
//
//     $routeProvider.otherwise({redirectTo: '/view1'});
// }]);
