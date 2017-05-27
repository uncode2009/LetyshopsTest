angular.module('shopsModule')
	.controller('shopsController', ['$scope', 'shops', function($scope, shops) {


		$scope.shops = shops;


	}])
