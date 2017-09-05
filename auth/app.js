var app = angular.module('loginapp', [
    'ui.router'
]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/signin');

    $stateProvider

        .state('signin', {
            url: '/signin',
            templateUrl: 'partials/signin.html',
            controller: 'SigninController'
        });

}

);

app.controller('MainController', ['$scope', '$rootScope', '$state', '$timeout', '$http', mainController]);

function mainController($scope, $rootScope, $state, $timeout, $http) {
    console.log("login Application started");

    $scope.loginUser = function (username,password) {
        var userDetails = {
            "UserName" : username,
            "Password" : password
        }
        $http({
            method: "POST",
            url: "http://34.227.57.242/UserService/Access.svc/Login",
            dataType: 'json',
            data: userDetails,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
                "Content-Type": "application/json"
            }
        }).then(function (response, status) {
            console.log(response, status);
        }, function (response, status) {
            console.log(response, status);
        });
    }
}