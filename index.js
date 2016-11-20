"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Demo = function (_React$Component) {
	_inherits(Demo, _React$Component);

	function Demo(props) {
		_classCallCheck(this, Demo);

		var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

		_this.state = {
			updateCounter: 0
		};

		_this.increment = _this.increment.bind(_this);
		_this.setUsername = _this.setUsername.bind(_this);
		_this.componentWillMount = _this.componentWillMount.bind(_this);
		return _this;
	}

	_createClass(Demo, [{
		key: "increment",
		value: function increment() {
			this.setState({
				updateCounter: this.state.updateCounter + 1
			});
		}
	}, {
		key: "setUsername",
		value: function setUsername(event) {
			event.preventDefault();
			var value = this.refs.inp.value;
			RStorage.update("username", value);
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			RStorage.clean();
			RStorage.subscribe("username", this.increment);
		}
	}, {
		key: "render",
		value: function render() {
			var username = RStorage.getItem("username");

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"h1",
					null,
					username ? username : "empty value"
				),
				_react2.default.createElement(
					"h4",
					null,
					this.state.updateCounter
				),
				_react2.default.createElement("input", { type: "text", onChange: this.setUsername, ref: "inp" }),
				_react2.default.createElement(
					"button",
					{ onClick: this.setUsername },
					"Set username"
				)
			);
		}
	}]);

	return Demo;
}(_react2.default.Component);

var Demo2 = function (_React$Component2) {
	_inherits(Demo2, _React$Component2);

	function Demo2(props) {
		_classCallCheck(this, Demo2);

		var _this2 = _possibleConstructorReturn(this, (Demo2.__proto__ || Object.getPrototypeOf(Demo2)).call(this, props));

		_this2.state = {
			updateCounter: 0
		};

		_this2.increment = _this2.increment.bind(_this2);
		_this2.componentWillMount = _this2.componentWillMount.bind(_this2);
		return _this2;
	}

	_createClass(Demo2, [{
		key: "increment",
		value: function increment() {
			this.setState({
				updateCounter: this.state.updateCounter + 1
			});
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			RStorage.subscribe("username", this.increment);
		}
	}, {
		key: "render",
		value: function render() {
			var username = RStorage.getItem("username");

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"h1",
					null,
					username ? username : "empty value"
				)
			);
		}
	}]);

	return Demo2;
}(_react2.default.Component);

if (window.reactStorageShowDemo && document.getElementById("react-storage-demo")) {
	_reactDom2.default.render(_react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(Demo, null),
		_react2.default.createElement(Demo2, null)
	), document.getElementById("react-storage-demo"));
}

exports.default = RStorage;
