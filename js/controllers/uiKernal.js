(function (uik) {

    var _cookMan = (function () {
        function createCookie(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else var expires = "";
            document.cookie = name + "=" + value + expires + ";path=/";
        }

        return {
            set: function (name, value, days) {
                createCookie(name, value, days);
            },
            get: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            delete: function (name) {
                createCookie(name, "", -1);
            }
        };
    })();


    uik.factory('$helpers', function ($rootScope) {

        function AsyncTask(action, success, fail) {

            var actionFunc = action;
            var successFunc = success;
            var failFunc = fail;

            function start(data, taskObject) {
                actionFunc(data, taskObject);
            }

            var taskObject = {
                start: function (data) {
                    start(data, taskObject);
                },
                endError: function (data) {
                    $rootScope.$apply(function () {
                        failFunc(data);
                    });
                },
                endSuccess: function (data) {
                    $rootScope.$apply(function () {
                        successFunc(data);
                    });
                }
            };

            return taskObject;

        }

        function task(actionFunc, successFunc, failFunc, inputs) {
            var newTask = new AsyncTask(actionFunc, successFunc, failFunc);
            newTask.start(inputs);
        }

        return {
            task: function (actionFunc, successFunc, failFunc) {
                task(actionFunc, successFunc, failFunc);
            },
            safeApply: function (fn) {
                if (fn && typeof fn === 'function') {
                    var phase = $rootScope.$$phase;
                    if (phase == '$apply' || phase == '$digest') fn();
                    else $rootScope.$apply(function () {
                        fn();
                    });
                }
            },
            getCookie: function (name) {
                return _cookMan.get(name);
            },
            setCookie: function (name, value, days) {
                _cookMan.set(name, value, days);
            },
            removeCookie: function (name) {
                _cookMan.delete(name);
            },
            getHash: function (data) {
                return _hashMan.hash(data);
            },
            getHost: function () {
                return getHost();
            },
            getTimeStamp: function () {
                var now = new Date();
                return ("" + now.getYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds() + now.getMilliseconds());
            }
        }

    });

    uik.factory('$auth', function ($http, $v6urls, $backdoor, $rootScope, $helpers) {

        var sessionInfo;
        var userName;
        var securityToken;
        var onLoggedInResultEvent;

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function logout() {

            $http({
                method: 'GET',
                url: $v6urls.auth + "/LogOut/" + securityToken,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).
                success(function (data, status, headers, config) {
                    _cookMan.delete("securityToken");
                    _cookMan.delete("authData");
                    $rootScope.$emit("auth_onLogout", {});

                }).
                error(function (data, status, headers, config) {
                    $backdoor.log("Auth service returned an error when logging out.");
                    $backdoor.log(data);

                    _cookMan.delete("securityToken");
                    _cookMan.delete("authData");
                    $rootScope.$emit("auth_onLogout", {});

                    //$rootScope.$emit("auth_onLogoutError", {isSuccess:false, message:""});
                });
        }

        return {
            login: function (username, password, domain) {
                login(username, password, domain)
            },
            logout: function () {
                logout();
            },
            onLogoutSuccess: function (func) {
                $rootScope.$on("auth_onLogout", func);
            },
            onLogoutError: function (func) {
                $rootScope.$on("auth_onLogoutError", func);
            },
            onLoginError: function (func) {
                $rootScope.$on("auth_onLoginError", func);
            },
            onLoginResult: function (func) {
                $rootScope.$on("auth_onLogin", func);
            },
            getSecurityToken: function () {
                if (securityToken) return securityToken;
                else return "N/A";
            },
            getUserName: function () {
                if (userName) return userName;
                else {
                    userName = $helpers.getTimeStamp();
                    return userName;
                }
            },
            setUserName: function (username) {
                if (username) {
                    userName = username;
                    return true;
                }
                else {
                    return false;
                }
            },
            getSession: function () {
                return sessionInfo;
            },
            forceLogin: function (username, password, domain) {
                userName = username;
                var loginResult = {}
                loginResult.details = {};

                loginResult.securityToken = $helpers.getTimeStamp();

                sessionInfo = loginResult.details;
                securityToken = loginResult.securityToken;

                _cookMan.set("securityToken", securityToken, 1);
                _cookMan.set("authData", "{}", 1);

                $rootScope.$emit("auth_onLogin", loginResult);

            },
            checkSession: function () {
                securityToken = _cookMan.get("securityToken");
                sessionInfo = _cookMan.get("appData");

                if (sessionInfo) {
                    // sessionInfo = JSON.parse(decodeURIComponent(sessionInfo));
                    // userName = sessionInfo.Username;
                }

                console.log("DEBUG : CheckSession - " + securityToken);
                console.log("DEBUG : sessionInfo - " + sessionInfo);
                //console.log("DEBUG : userName - " + userName);

                if (securityToken == null) {
                    var nagivateUrl = window.location.protocol + "//" + getHost() + "/s.php?r=" + location.href;
                    location.href = nagivateUrl;
                }

                return securityToken != null;
            }
        }
    });

    uik.factory('$systemUrls', function () {
        var p = location.protocol;
        return {
            svc_access: p + "//34.227.57.242"
        };
    });

})(angular.module('uiKernel', []))
