var app = angular.module('projectx', [
	'ui.router'
]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'content/home/home.html'
        });

}




);