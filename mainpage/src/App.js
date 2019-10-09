import React from 'react';
import Attendance from './Attendance';
import AttendanceResult from './AttendanceResult';
import axios from 'axios';

import './App.css';

class App extends React.Component {

  state = {
    isResult: false,
    name: '',
    time: '',
    type: '',
  }

  getLoginResult = async () => {
    const {
      data: {
        name,
        time,
        type
      }
    } = await axios.get(
      "http://172.30.1.13:4000"
    );
    console.log("qweqweqweqwe : ", name,time,type);

    this.setState({ name,time,type });
  };
  componentDidMount() {
    this.getLoginResult();
  }

  componentDidUpdate() {
    if(this.state.isResult === true) {
    setTimeout(function () {
      this.setState({ isResult: false })
    }.bind(this), 5000)
  }
  }

  AttendanceResult = () => {
    this.setState({ isResult: true });
    this.getLoginResult();
  };

  render() {
    const { isResult, name,time,type } = this.state;
    return (
      <div className="App">
        <center>
          <div class="box">
          <p class="title">출근 관리 시스템</p>
          {isResult ?
          <AttendanceResult
          name={name}
          time={time}
          type={type}
          /> : <Attendance />}
          <input name="Attendance_NFC" type="text" placeholder="NFC" autofocus="autofocus" />
          <button onClick={this.AttendanceResult}>Check</button>
          </div>
        </center>
      </div>
    );
  }
}

export default App;