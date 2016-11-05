import React from "react";

class YourComponent extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return <h1>Hello, {(this.props.name) ? this.props.name : "Dzhakhar"}</h1>
	}
}


export default YourComponent;
