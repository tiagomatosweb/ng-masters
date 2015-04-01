(function(){
	"use strict";

	if (!window.Global) {
		window.Global = {}
	}
	if (!Global.angular_dependencies) {
		Global.angular_dependencies = ['messages', 'ngAnimate'];
	}

	angular.module('myapp', Global.angular_dependencies);
	angular.module('myapp').config(['$interpolateProvider', function($interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	}]);

	angular.module('myapp').controller('MsgController', ['$scope', 'MsgService', function($scope, MsgService) {
		$scope.m = MsgService;
	}]);
})();