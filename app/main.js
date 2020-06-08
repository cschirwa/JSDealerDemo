

var app = angular.module('app', ['ngRoute']);
    app.constant("baseUrl","http://localhost:8080");
    var dealerData;

    app.controller('AppController', function ($scope) {
    });
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/index.html',
            controller: 'LoginController'
        }).when("/dealer", {
            templateUrl: '/dealer.html',
            controller: 'DealerController'
        }).otherwise ({
            redirectTo: '/index.html'
        })
        $locationProvider.html5Mode(true);
    });


    app.controller('LoginController', function($scope, $http) {

        var loginVar = this;
        var idNumber = '';
        var password = '';
        var loginData = {
            'idNumber': '1234567890123',
            'password': '1@Foobar'
        };

        loginVar.login = function() {
            $http.post('https://app.bmw.co.za/dws/CandidateTest/servlet/Login', loginData).then(successCallback, errorCallback);
        };


        function successCallback(){
            console.log("Success successCallback");
            window.location = 'http://localhost:8080/dealer.html'
        }

        function errorCallback(){
            console.log("errorCallback");
        }

        // function successAPICallback(data){
        //   JSONData = data;
        //   console.log("Success successAPICallback : " + JSON.stringify(JSONData));
        //   window.location = 'http://localhost:8080/dealerLocator.html';
        //   // successCallback();
        // }
        // function errorAPICallback(){
        //   console.log("errorAPICallback");
        // }
        // function loadDealers(){
        //   $http.get('https://api.bmw.co.za/webcontact/v1/dealer').then(successAPICallback, errorAPICallback);
        // }

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

    app.controller('LogoutController', function($scope,$location){
        $scope.logout = function(){
            $location.path('/login');
            window.location="index.html";
        }
    });