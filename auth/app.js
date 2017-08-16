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
}