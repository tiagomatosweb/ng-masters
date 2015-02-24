(function() {
	"use strict";

	if (typeof String.prototype.startsWith != "function") {
	  String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	  };
	}
	if (typeof String.prototype.endsWith != "function") {
	  String.prototype.endsWith = function (str){
		return this.slice(-str.length) == str;
	  };
	}

	if(!window.Global){
			window.Global = {};
	}
	if(!Global.angular_dependencies){
		Global.angular_dependencies = [];
	}


	angular.module('myapp', Global.angular_dependencies);
	angular.module('myapp').config(['$interpolateProvider', function($interpolateProvider){
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	}]);

	angular.module('myapp').factory('AngulifeService', ['$interval', function($interval) {
		var m = {
			table: [],
			interval: 500,
			msg: false,
			end: false,
			runInterval: null,
			row: '',
			col: '',
			stepCounter: 0
		}

		m.changeMsg = function() {
			m.msg = !m.msg;
		}

		m.changeEnd = function() {
			m.end = !m.end;
		}

		m.updateTable = function() {
			if (m.row != "" && m.col != "") {
				m.msg = false;
				m.table = [];
				for(var i=0;i<m.row;i++) {
						m.table[i] = [];
					for(var j=0;j<m.col;j++) {
						m.table[i][j] = { live: false }
					}
				}
			}
		}

		m.clearTable = function() {
			m.table = [];
			m.row = '';
			m.col = '';
			m.msg = '';
			m.end = '';
			m.stepCounter = 0;
			$interval.cancel(m.runInterval);
		}

		m.changeLive = function(j) {
			j.live = !j.live;
		}

		m.go = function() {
			if (m.validator()) {
				m.runInterval = $interval(m.step, m.interval);
			}
		}

		m.step = function() {
			if (m.validator()) {
				var tableClone = angular.copy(m.table);

				for (var i=0;i<tableClone.length;i++) {
					for (var j=0;j<tableClone[i].length;j++) {
						var neighborsLives = m.countNeighborsLives(i, j, tableClone);
						if (tableClone[i][j].live){
							if (neighborsLives < 2 || neighborsLives > 3) {
								m.table[i][j].live = false;
							}
						} else {
							if (neighborsLives == 3) {
								m.table[i][j].live = true;
							}
						}
					}
				}
				m.stepCounter++;

				if (!m.countLives(m.table)) {
					$interval.cancel(m.runInterval);
					m.end = true;
				}
			}
		}

		m.countLives = function(table) {
			var count = 0;
			for (var i=0;i<table.length;i++) {
				for (var j=0;j<table[i].length;j++) {
					if(table[i][j].live) {
						count++;
					}
				}
			}
			return count;
		}

		m.countNeighborsLives = function(x, y, tableClone) {
			var count = 0;
			//x y+1
			//x y-1

			//x+1 y
			//x-1 y

			//x+1 y+1
			//x-1 y-1

			//x-1 y+1
			//x+1 y-1

			if (y+1 in tableClone[x]) {
				if (tableClone[x][y+1].live) {
					count++;
				}
			}
			if (y-1 in tableClone[x]) {
				if (tableClone[x][y-1].live) {
					count++;
				}
			}

			if (x+1 in tableClone) {
				if (tableClone[x+1][y].live) {
					count++;
				}
				if (y+1 in tableClone[x]) {
					if (tableClone[x+1][y+1].live) {
						count++;
					}
				}
				if (y-1 in tableClone[x]) {
					if (tableClone[x+1][y-1].live) {
						count++;
					}
				}
			}
			if (x-1 in tableClone) {
				if (tableClone[x-1][y].live) {
					count++;
				}
				if (y-1 in tableClone[x]) {
					if (tableClone[x-1][y-1].live) {
						count++;
					}
				}
				if (y+1 in tableClone[x]) {
					if (tableClone[x-1][y+1].live) {
						count++;
					}
				}
			}



			/*
			if (x == 0) {
				if (y == 0) {
					if (tableClone[x][y+1].live) {
						count++;
					}
					if (tableClone[x+1][y+1].live) {
						count++;
					}
					if (tableClone[x+1][y].live) {
						count++;
					}
				} else if (y == m.col-1) {
					if (tableClone[x][y-1].live) {
						count++;
					}
					if (tableClone[x+1][y-1].live) {
						count++;
					}
					if (tableClone[x+1][y].live) {
						count++;
					}
				} else {
					if (tableClone[x][y+1].live) {
						count++;
					}
					if (tableClone[x+1][y+1].live) {
						count++;
					}
					if (tableClone[x+1][y].live) {
						count++;
					}
					if (tableClone[x+1][y-1].live) {
						count++;
					}
					if (tableClone[x][y-1].live) {
						count++;
					}
				}
			} else if (x == m.row-1) {
				if (y == 0) {
					if (tableClone[x][y+1].live) {
						count++;
					}
					if (tableClone[x-1][y+1].live) {
						count++;
					}
					if (tableClone[x-1][y].live) {
						count++;
					}
				} else if (y == m.col-1) {
					if (tableClone[x][y-1].live) {
						count++;
					}
					if (tableClone[x-1][y-1].live) {
						count++;
					}
					if (tableClone[x-1][y].live) {
						count++;
					}
				} else {
					if (tableClone[x][y-1].live) {
						count++;
					}
					if (tableClone[x-1][y-1].live) {
						count++;
					}
					if (tableClone[x-1][y].live) {
						count++;
					}
					if (tableClone[x-1][y+1].live) {
						count++;
					}
					if (tableClone[x][y+1].live) {
						count++;
					}
				}
			} else {
				if (y == 0) {
					if (tableClone[x-1][y].live) {
						count++;
					}
					if (tableClone[x-1][y+1].live) {
						count++;
					}
					if (tableClone[x][y+1].live) {
						count++;
					}
					if (tableClone[x+1][y+1].live) {
						count++;
					}
					if (tableClone[x+1][y].live) {
						count++;
					}

				} else if (y == m.col-1) {
					if (tableClone[x-1][y].live) {
						count++;
					}
					if (tableClone[x-1][y-1].live) {
						count++;
					}
					if (tableClone[x][y-1].live) {
						count++;
					}
					if (tableClone[x+1][y-1].live) {
						count++;
					}
					if (tableClone[x+1][y].live) {
						count++;
					}
				} else {
					if (tableClone[x-1][y].live) {
						count++;
					}
					if (tableClone[x-1][y+1].live) {
						count++;
					}
					if (tableClone[x][y+1].live) {
						count++;
					}
					if (tableClone[x+1][y+1].live) {
						count++;
					}
					if (tableClone[x+1][y].live) {
						count++;
					}
					if (tableClone[x+1][y-1].live) {
						count++;
					}
					if (tableClone[x][y-1].live) {
						count++;
					}
					if (tableClone[x-1][y-1].live) {
						count++;
					}
				}
			}
			*/

			return count;
		}

		m.validator = function() {
			if (m.row != "" && m.col != "") {
				m.msg = false;
				if (m.end) {
					m.stepCounter = 0;
				}
				m.end = false;
				return true;
			} else {
				m.end = false;
				m.msg = true;
				return false;
			}
		}

		return m;
	}]);

	angular.module('myapp').controller('AngulifeController', ['$scope', 'AngulifeService', function($scope, AngulifeService) {
		$scope.m = AngulifeService;
	}]);
})();
