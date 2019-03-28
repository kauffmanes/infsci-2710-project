import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    users: []
  }
  componentDidMount() {
    this.getUsers();
  }

  getUsers = _ => {
    fetch('http://localhost:3001')
      .then(response => console.log(response))
      .then(response => this.setState({ users: response.users }))
      .catch(err => console.log(err));
  }

  showUsers = user => <div key={user.id}>{user.username}</div>

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        {users.map(this.showUsers())}
      </div>
    );
  }
}

export default App;
