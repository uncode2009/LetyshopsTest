angular.module('authModule')
	.controller('authController', authController);
	authController.$inject = ['$scope', '$rootScope', 'localStorageService'];
	function authController($scope, $rootScope, localStorageService) {

		$scope.regForm = {

			email: '',
			password: '',
			passwordConf: ''

		}

		$scope.loginForm = {

			email: '',
			password: ''
		}

		$scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
		
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

	}
