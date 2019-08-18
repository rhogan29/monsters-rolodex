import React, { Component } from 'react';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
    // any non arrow function methods must be bound here:
    // this.handleChange = this.handleChange.bind(this) if we dont use an arrow function below
  }

  // as soon as this component mounts, fetch the users, and update state
  //LIFECYCLE METHOD - as soon as component mounts to dom
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users') // fetch to this URL
    .then(response => response.json()) // getting the data into JSON format
    .then(users => this.setState({ monsters: users })); // setting the data to state so we can use it. 
  }

  // arrow function is automatically bound to the place that it was defined!
  handleChange = event => {
    this.setState({ searchField: event.target.value });
  }

  render() {

    const { monsters, searchField } = this.state;

    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      );

    return (
      <div className='App'>
      <h1> Monsters Rolodex </h1>
      <SearchBox
        placeholder='Search monsters'
        handleChange={this.handleChange}
      />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
