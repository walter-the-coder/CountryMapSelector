'use strict';

angular.module('knowitApp').factory('Positionservice', ['$http', '$q', function ($http, $q) {
	return {
		getJSON: function(fileURL){
			var deferred = $q.defer();

			$http({method: 'GET', url: fileURL}).
			    success(function(data){
			    	deferred.resolve(data);
			    }).
			    error(function(status) {
			    	deferred.reject(status);
			    });
		    return deferred.promise;
		}
	};
}]);