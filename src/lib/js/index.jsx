import React from "react";
import ReactDOM from "react-dom";

var ReactStorage = (function(){
	var instance;

	function createInstance(){
		var scope = new Object();

		scope.storage = {};
		scope.listeners = {};
		scope.prefix = "_rstorage_";

		scope.clean = function(){
			for(var name in localStorage){
				if(name.indexOf(scope.prefix) > -1){
					localStorage.removeItem(name);
				}
			}
		}

		scope.subscribe = function(name, listener){
			if(scope.listeners[name]){
				scope.listeners[name].push(listener);
			} else {
				scope.listeners[name] = [];
				scope.listeners[name].push(listener);
			}
		};

		scope.removeListener = function(name, i){
			delete scope.listeners[name][i];
			return scope.listeners;
		}

		scope.setItem = function(name, value){
			value = value;
			localStorage.setItem(scope.prefix + name, value);
			scope.storage[scope.prefix + name] = value;
		}

		scope.getItem = function(name){
			return localStorage.getItem(scope.prefix + name);
		}

		scope.update = function(name, newValue){
			scope.storage[scope.prefix + name] = newValue;
			localStorage.setItem(scope.prefix + name, newValue);
			for(let i = 0; i < scope.listeners[name].length; i++){
				if(typeof(scope.listeners[name][i]) === "function"){
					scope.listeners[name][i](newValue);
				}
			}
		}

		return scope;
	}

	return {
		init: function(){
			if(!instance){
				instance = createInstance();
			}

			return instance;
		}
	}
})();

var RStorage = ReactStorage.init();

class Demo extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			updateCounter: 0
		}

		this.increment = this.increment.bind(this);
		this.setUsername = this.setUsername.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	increment(){
		this.setState({
			updateCounter: this.state.updateCounter + 1
		})
	}

	setUsername(event){
		event.preventDefault();
		let value = this.refs.inp.value;
		RStorage.update("username", value);
	}

	componentWillMount(){
		RStorage.clean();
		console.log(RStorage.clean);
		RStorage.subscribe("username", this.increment);
	}

	render(){
		let username = RStorage.getItem("username");

		return <div>
			<h1>{(username) ? username : "empty value"}</h1>
			<h4>{this.state.updateCounter}</h4>
			<input type="text" onChange={this.setUsername} ref="inp"></input>
			<button onClick={this.setUsername}>Set username</button>
		</div>
	}
}

class Demo2 extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			updateCounter: 0
		}

		this.increment = this.increment.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	increment(){
		this.setState({
			updateCounter: this.state.updateCounter + 1
		})
	}

	componentWillMount(){
		RStorage.subscribe("username", this.increment);
	}

	render(){
		let username = RStorage.getItem("username");

		return <div>
			<h1>{(username) ? username : "empty value"}</h1>
		</div>
	}
}

ReactDOM.render(
	<div><Demo/><Demo2/></div>,
	document.getElementById("demo")
)

export default RStorage;
