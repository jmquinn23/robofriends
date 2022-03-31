import React, {Component} from 'react';
import ErrorBoundry from '../Components/ErrorBoundry';
import CardList	 from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
// import {robots} from './robots'
import './App.css';




class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchField: ''
		}
	}

	componentDidMount(){
		// this.setState({robots: robots});
		fetch('https://jsonplaceholder.typicode.com/users')
  		.then(response => {
  			return response.json();
  		})
  		.then(users => {
  			this.setState({robots: users})
  		})

	};

	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value})
		console.log(event.target.value);
	}
	

	render () {
		const { robots, searchField } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
		 return !robots.length ? <h1>Loading</h1> :
		 (
			<div className='tc'>
			<h1 className='f1'>RoboFriends</h1>
			<SearchBox searchChange = {this.onSearchChange}/>
			<Scroll>
				<ErrorBoundry>
					<CardList robots={filteredRobots}/>	
				</ErrorBoundry>				
			</Scroll>
			</div>
		);
	}

} 


export default App;