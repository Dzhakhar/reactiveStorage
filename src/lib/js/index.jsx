var ReactStorage = (function(){
	var instance;

	function createInstance(){
		var scope = new Object();

		scope.storage = {};
		scope.listeners = {};
		scope.prefix = "_rstorage_";

		scope.clean = function(name){
			if(name){
				localStorage.removeItem(name);
				return true;
			}
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
			scope.storage[scope.prefix + name] = value;
			if(value === undefined){
				value = "{{#type undefined#}}";
			}
			localStorage.setItem(scope.prefix + name, JSON.stringify(value));

			if(scope.listeners[name]){
				for(let i = 0; i < scope.listeners[name].length; i++){
					if(typeof(scope.listeners[name][i]) === "function"){
						scope.listeners[name][i](value);
					}
				}
			}
		}

		scope.getItem = function(name, defaultValue=undefined){
			let value = JSON.parse(localStorage.getItem(scope.prefix + name));

			if(value === "{{#type undefined#}}"){
				if(defaultValue){
					return defaultValue;
				}
				
				return undefined;
			}

			if(typeof(JSON.parse(value)) === "boolean"){
				return JSON.parse(value);
			}

			return value;
		}
		
		scope.isExists = function(key){
			return scope.storage.hasOwnProperty(key);
		}
		
		scope.getStorage = function(){
			return scope.storage;
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

export default RStorage;
