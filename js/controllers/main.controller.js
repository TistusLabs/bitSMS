app.controller('MainController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$state', '$helpers', '$systemUrls', mainController]);

function mainController($scope, $rootScope, $state, $timeout, $http, $state, $helpers, $systemUrls) {
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

    $scope.logoutSession = function () {
        debugger
        var payload = {};
        payload.SecurityToken = '"' + $helpers.getCookie("securityToken") + '"';
        payload.SessionKey = '"' + $helpers.getCookie("SessionKey") + '"';
        $http({
            method: "POST",
            url: $systemUrls.svc_access + "/UserService/Access.svc/Logout",
            dataType: 'json',
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response, status) {
            debugger
            if (response.data.Response) {
                $helpers.removeCookie("securityToken");
                $helpers.removeCookie("SessionKey");
                window.location.href = "auth/";
            } else if (response.data.Error != null) {
                alert("There was an error: " + response.data.Error.ErrorMessage);
            }
            console.log(response, status);
        }, function (response, status) {
            console.log(response, status);
        });
    };
}