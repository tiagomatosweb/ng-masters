(function() {
	"use strict";

	angular.module('messages', []);
	angular.module('messages').factory('MsgService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
		var m = {
			Loading: {
				msg: 'loading...',
				show: false,
			},
			Alert: {
				title: '',
				msg: '',
				show: false,
			},
			Modal: {
				title: '',
				msg: '',
				show: false,
			}

		}

		m.showLoading = function(msg) {
			if (msg) {
				m.Loading.msg = msg;
			}
			m.Loading.show = true;
			$timeout(m.closeLoading, 2000);
		}

		m.closeLoading = function() {
			m.Loading.show = false;
		}

		m.showAlert = function(title, msg) {
			m.Alert.title = title;
			m.Alert.msg = msg;
			m.Alert.show = true;
		}

		m.closeAlert = function() {
			m.Alert.show = false;
		}

		m.showModal = function(element, title, msg) {
			m.Modal.title = title;
			m.Modal.msg = msg;
			m.Modal.show = true;
			$(element).modal({show: 'show', backdrop: 'static', keyboard: false});
		}

		m.closeModal = function(element) {
			$(element).modal('hide');
			$(element).on('hidden.bs.modal', function () {
				m.Modal.show = false;
			});
		}

		return m;
	}]);

	angular.module('messages').directive('msgLoading', function() {
		return {
			restric: 'E',
			replace: true,
			templateUrl: 'template/loading.html'
		}
	});

	angular.module('messages').directive('msgAlert', function() {
		return {
			restric: 'E',
			replace: true,
			templateUrl: 'template/alert.html',
		}
	});
	angular.module('messages').directive('msgModal', function() {
		return {
			restric: 'E',
			replace: true,
			templateUrl: 'template/modal.html',
      /*link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }*/
		}
	});
})();





