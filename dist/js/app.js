angular.module('appModule', [
		'ngRoute',
		'authModule',
		'LocalStorageModule',
		'shopsModule',
		'ui.bootstrap',
		'angularUtils.directives.dirPagination',

	])
	.run(['localStorageService', '$rootScope', function(localStorageService, $rootScope) {

		$rootScope.loggedUser = localStorageService.get('logged');

		console.log($rootScope.loggedUser);

	}])
	.directive("matchPassword", function() {
		return {
			require: "ngModel",
			scope: {
				otherModelValue: "=matchPassword"
			},
			link: function(scope, element, attributes, ngModel) {

				ngModel.$validators.matchPassword = function(modelValue) {
					return modelValue == scope.otherModelValue;
				};

				scope.$watch("otherModelValue", function() {
					ngModel.$validate();
				});
			}
		};
	});

angular.module('authModule',[]);
angular.module('shopsModule',[]);
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
                controller: 'shopsController',
                resolve: {
                    shops: function(shopsService) {
                        return shopsService.getShops();
                        console.log($rootScope.loggedUser);

                    },
                    checkPermission: function($location, $rootScope) {

                        if (!$rootScope.loggedUser) {
                            $location.path("/restricted");

                        }


                    }
                }
            })
            .when("/restricted", {
                templateUrl: "./views/auth/restricted/restricted.html",
            })

    }]);

angular.module('appModule')
.constant('config',{
	shops:'http://www.json-generator.com/api/json/get/bZTcBnsIgO',
});
angular.module('shopsModule')
	.factory('shopsService', ['$http', 'config', function($http, config) {

		var publicMethod = {
			getShops: function() {

				return $http.get(config.shops)
					.then(function(response) {
						console.log(response);
						return response.data;

					})
					.catch(function(err) {
						console.log(err);
					})

			}
		};
		return publicMethod;
	}]);

angular.module('authModule')
	.controller('authController', ['$scope', '$rootScope', 'localStorageService', function($scope, $rootScope, localStorageService) {

		$scope.regForm = {

			email: '',
			password: '',
			passwordConf: ''

		}

		$scope.loginForm = {

			email: '',
			password: ''
		}
		$scope.signUp = function() {

			localStorageService.set('registered', $scope.regForm);
			console.log(localStorageService);
			if ($scope.userForm.$valid) {
				alert("registration success");
				location.href = "#/";
			}

		}

		$scope.login = function() {
			$scope.registeredUser = localStorageService.get('registered');
			console.log($scope.registeredUser);

			if ($scope.registeredUser !== null && $scope.registeredUser.email == $scope.loginForm.email && $scope.registeredUser.password == $scope.loginForm.password) {
				$rootScope.loggedUser = $scope.loginForm;
				localStorageService.set('logged', $scope.loginForm);
				location.href = "#/shops";


			} else {
				alert('incorrect email or password');
			}

		}

		$scope.logOut = function() {
			delete $rootScope.loggedUser;
			localStorageService.remove('logged');
		}

	}])

angular.module('shopsModule')
	.controller('shopsController', ['$scope', 'shops', function($scope, shops) {


		$scope.shops = shops;


	}])
