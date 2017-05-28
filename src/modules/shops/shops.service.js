angular.module('shopsModule')
	.factory('shopsService', shopsService);
shopsService.$inject = ['$http', 'config'];

function shopsService($http, config) {

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
};
