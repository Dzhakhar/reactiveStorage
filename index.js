"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var ReactStorage = function () {
	var instance;

	function createInstance() {
		var scope = new Object();

		scope.storage = {};
		scope.listeners = {};
		scope.prefix = "_rstorage_";

		scope.clean = function (name) {
			if (name) {
				localStorage.removeItem(name);
				return true;
			}
			for (var name in localStorage) {
				if (name.indexOf(scope.prefix) > -1) {
					localStorage.removeItem(name);
				}
			}
		};

		scope.subscribe = function (name, listener) {
			if (scope.listeners[name]) {
				scope.listeners[name].push(listener);
			} else {
				scope.listeners[name] = [];
				scope.listeners[name].push(listener);
			}
		};

		scope.removeListener = function (name, i) {
			delete scope.listeners[name][i];
			return scope.listeners;
		};

		scope.setItem = function (name, value) {
			value = value;
			localStorage.setItem(scope.prefix + name, value);
			scope.storage[scope.prefix + name] = value;
		};

		scope.getItem = function (name) {
			return localStorage.getItem(scope.prefix + name);
		};

		scope.update = function (name, newValue) {
			scope.storage[scope.prefix + name] = newValue;
			localStorage.setItem(scope.prefix + name, newValue);
			for (var i = 0; i < scope.listeners[name].length; i++) {
				if (typeof scope.listeners[name][i] === "function") {
					scope.listeners[name][i](newValue);
				}
			}
		};

		return scope;
	}

	return {
		init: function init() {
			if (!instance) {
				instance = createInstance();
			}

			return instance;
		}
	};
}();

var RStorage = ReactStorage.init();

exports.default = RStorage;
