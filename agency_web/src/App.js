import React from 'react';
import Agency from './Agency';
import User from './User';
import Government from './Government';

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
    const { isUser, isAgency, isGovernment } = this.state;
    return (
      <div className="App">
        <button onClick={this.User}>User</button>
        <button onClick={this.Agency}>Agency</button>
        <button onClick={this.Government}>Government</button>
        {isUser ? <User /> : isAgency ? <Agency /> : <Government />}
      </div>
    );
  }
}

export default App;
