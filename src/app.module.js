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
