app.controller('MainController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$state', mainController]);

function mainController($scope, $rootScope, $state, $timeout, $http, $state) {
    console.log("Application started");

    $scope.currentYear = new Date();
    $scope.mainMenu = [];

    $scope.getMainMenuItems = function () {
        $http({
            url: "././json/main-menu.json",
            dataType: "json",
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
                "Content-Type": "text/json"
            }
        }).then(function (response) {
            //debugger
            $scope.mainMenu = response.data;
        }, function (e) {
            console.log("Error loading main menu items", e);
        });
    };
    $scope.getMainMenuItems();

    $scope.navigateToState = function (location) {
        console.log("Navigating to URL: ", location);
        $state.go(location);
        $state.transitionTo(location);
    };
}