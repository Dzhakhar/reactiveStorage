# reactive-storage
This is a storage that uses observer design pattern to call every listener after updating the storage.

Simple example. Using with React JS

```
npm install real-life --save
```

```javascript
import RStorage from "real-life";

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
		RStorage.clean(); // if you want to clean localStorage after reloading
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
```
