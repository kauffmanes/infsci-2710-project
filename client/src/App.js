import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      users: []
    }
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount(){
    this.getUsers();
  }

  getUsers() {
        axios.get('/users')
    .then((data) => {
      console.log(data.data.users);
      this.setState({users: data.data.users});
    })
    .catch(error => console.log(error));
  }
  
  render() {
    const { users } = this.state;
    return (
      <div className="App">
        hi
        {users.map(user => <div key={user.id}>{user.firstName} {user.lastName}</div>)}
      </div>
    );
  }
}

export default App;

