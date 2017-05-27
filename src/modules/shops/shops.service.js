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
