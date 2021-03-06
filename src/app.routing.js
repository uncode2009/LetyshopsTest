angular.module('appModule')
    .config(['$routeProvider', '$locationProvider', 'localStorageServiceProvider', function($routeProvider, $locationProvider, localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('around')
            .setStorageType('localStorage')
            .setNotify(true, true);
        $locationProvider.hashPrefix('');
        $routeProvider

            .when("/login", {
                templateUrl: "./views/auth/login/login.html",
                controller: "authController"
            })
            .when("/registration", {
                templateUrl: "./views/auth/registration/registration.html",
                controller: "authController"
            })
            .when("/shops", {
                templateUrl: "./views/shops/shops.html",
                controller: 'shopsController'
          
            })
            .when("/restricted", {
                templateUrl: "./views/auth/restricted/restricted.html",
            })

    }]);
