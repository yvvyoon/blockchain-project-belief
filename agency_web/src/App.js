import React from 'react';
import Agency from './Agency';
import User from './User';
import Government from './Government';

import './App.css';

class App extends React.Component {

  state = {
    isUser: true,
    isAgency: false,
    isGovernment: false,
  }

  User = () => {
    this.setState({ isUser: true, isAgency: false, isGovernment: false })
  };

  Agency = () => {
    this.setState({ isUser: false, isAgency: true, isGovernment: false })
  };

  Government = () => {
    this.setState({ isUser: false, isAgency: false, isGovernment: true })
  };

  render() {
    const { isUser, isAgency } = this.state;
    return (
      <div className="App">
        <center>
        <button onClick={this.User}>User</button>
        <button onClick={this.Agency}>Agency</button>
        <button onClick={this.Government}>Government</button>
        {isUser ? <User /> : isAgency ? <Agency /> : <Government />}
        </center>
      </div>
    );
  }
}

export default App;
