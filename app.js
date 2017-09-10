var app = angular.module('bitsms', [
    'ui.router',
    'angular.filter',
    'uiKernel'
]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'partials/main-dashboard.html'
        }).state('appone', {
            url: '/appone',
            templateUrl: 'partials/sample-app-one.html'
        }).state('apptwo', {
            url: '/apptwo',
            templateUrl: 'partials/sample-app-two.html'
        }).state('usercreation', {
            url: '/usercreation',
            controller:'UserAdministration',
            templateUrl: 'partials/user-creation.html'
        });

}

);