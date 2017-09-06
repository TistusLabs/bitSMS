/* use strickt */

app.controller('SigninController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', signinController]);

function signinController($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers) {
    console.log("signup page loaded");

    $scope.loginUser = function (username, password) {
        var userDetails = {
            "UserName": username,
            "Password": password
        }
        // headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        //     "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
        //     "Content-Type": "application/json"
        // }
        $http({
            method: "POST",
            url: $systemUrls.svc_access + "/UserService/Access.svc/Login",
            dataType: 'json',
            data: userDetails,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response, status) {
            debugger
            if(response.data.SecurityToken != null){
                $helpers.setCookie("securityToken", response.data.SecurityToken, 1);
                window.location.href ="../";
            }else if(response.data.Error != null){
                alert("There was an error: "+response.data.Error.ErrorMessage);
            }
            console.log(response, status);
        }, function (response, status) {
            console.log(response, status);
        });
    }
}