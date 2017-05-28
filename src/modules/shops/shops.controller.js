angular.module('shopsModule')
	.controller('shopsController', shopsController);
shopsController.$inject = ['$scope', 'shopsService','$rootScope'];

function shopsController($scope, shopsService,$rootScope) {



	if (!$rootScope.loggedUser) {
		location.href = "#/restricted";

	} else {
		shopsService.getShops()
			.then(function(response) {
				$scope.shops = response;


			})
			.catch(function(err) {
				console.log(err);
			})

	}

}



