import React from 'react';
import TimeLog from './timelog';
import Admin from './admin';
import axios from 'axios';
import './App.css';
import userPng from './user.png'
import filePng from './file.png'
import padlockPng from './padlock.png'
import beliefPng from './belief.png'

class App extends React.Component {
  state = {
    isLogin: true,
    isTimeLog: false,
    isAdmin: false,
    login: false,
    name: '',
    admin: '',
    number: '',
    Timelogs: [],
    dept: '',
    Admins: []
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      number: e.target.value
    });
  };

  pushLogin = (e) => {
    this.login();
    this.TimeLog();
    e.preventDefault();
  }

  isLogin = () => {
    this.setState({ isLogin: true, isTimeLog: false, isAdmin: false })
  }
  isTimeLog = () => {
    this.setState({ isLogin: false, isTimeLog: true, isAdmin: false })
  }
  isAdminTimeLog = () => {
    this.setState({ isLogin: false, isTimeLog: true, isAdmin: true })
  }
  isAdmin = () => {
    this.setState({ isLogin: false, isTimeLog: false, isAdmin: true, login: true })
  }
  login = async () => {
    const {
      data: {
        name,
        admin
      }
    }
      = await axios.get('http://70.12.227.203:4000/users', {
        params: {
          result: this.state.number
        }
      })
    await console.log(name, admin);
    await this.setState({ isLogin: false, isTimeLog: true, isAdmin: admin, login: true, name })
  }
  Logout = () => {
    this.setState({ isLogin: true, isTimeLog: false, isAdmin: false, login: false })
  }

  TimeLog = async () => {
    const {
      data: {
        Timelogs
      }
    }
      = await axios.get('http://70.12.227.203:4000/timelogs', {
        params: {
          result: this.state.number
        }
      })
    await console.log(Timelogs);
    await this.setState({ Timelogs })

  }

  Admin = async () => {
    this.isAdmin();
    const {
      data: {
        Admins
      }
    }
      = await axios.get('http://70.12.227.203:4000/admins', {
        /*         params: {
                  result: this.state.dept
                } */
      })
    await console.log(Admins);
    await this.setState({ Admins })
  }


  render() {
    const { isLogin, isTimeLog, isAdmin, login, Timelogs, Admins } = this.state;
    return (
      <div className="App">
        <div className="sidebar">
          <ul className="logo">
            <li><p className="logo"><img className="logo" src={beliefPng} alt=""/><p className="logotext">Belief</p></p></li>
          </ul>
          {login ?
            isAdmin ?
              this.isAdminTimeLog ?
                <ul className="sidenav">
                  <li><p onClick={this.Logout}><img src={userPng} alt=""/>로그아웃</p></li>
                  <li><p onClick={this.isAdminTimeLog}><img src={filePng} alt=""/>근태기록</p></li>
                  <li><p onClick={this.Admin}><img src={padlockPng} alt=""/>부서별조회</p></li>
                </ul>
                :
                <ul className="sidenav">
                  <li><p onClick={this.Logout}><img src={userPng} alt=""/>로그아웃</p></li>
                  <li><p onClick={this.isAdminTimeLog}><img src={filePng} alt=""/>근태기록</p></li>
                  <li><p onClick={this.Admin}><img src={padlockPng} alt=""/>부서별조회</p></li>
                </ul>
              :
              <ul className="sidenav">
                <li><p onClick={this.Logout}><img src={userPng} alt=""/>로그아웃</p></li>
                <li><p onClick={this.isTimeLog}><img src={filePng} alt=""/>근태기록</p></li>
              </ul>
            :
            
            <ul className="sidenav">
              <li><p onClick={this.isLogin}><img src={userPng} alt=""/>로그인</p></li>
            </ul>
          }
        </div>
        <div className="main">
          {isLogin ?
            <form action="" method="post">
              <div className="container">
                <label><b>사원번호</b></label>
                <input type="text" value={this.state.number} onChange={this.handleChange} placeholder="사원번호를 입력해주세요." />
                <label><b>비밀번호</b></label>
                <input type="password" placeholder="비밀번호를 입력해주세요." />
                <button type="submit" onClick={this.pushLogin}>로그인</button>
              </div>
            </form>

            : isTimeLog ?
              <div>
                <p className="title">{this.state.name}님 반갑습니다.</p>
                <table>
                  <tr>
                    <th className="tb_width">사원번호</th>
                    <th className="tb_width">날짜</th>
                    <th className="tb_width">시간</th>
                    <th className="tb_width">분류</th>
                  </tr>
                </table>
                {Timelogs.map(timelog => (
                  <TimeLog
                    number={timelog.number}
                    date={timelog.date}
                    time={timelog.time}
                    type={timelog.type} />
                ))}
                <p>이번 주 총 근무시간은 00분 입니다.</p>
              </div>
              :
              <div>
                <p>관리자님 반갑습니다.</p>
                <table>
                  <tr>
                    <th className="tb_width">부서</th>
                    <th className="tb_width">사원번호</th>
                    <th className="tb_width">이름</th>
                    <th className="tb_width">근무시간</th>
                  </tr>
                </table>
                {Admins.map(admin => (
                  <Admin
                    dept={admin.dept}
                    number={admin.number}
                    name={admin.name}
                    total={admin.total}
                  />
                ))}
                <p>10/14(월)~10/16(수) IT1팀의 조회 내역입니다.</p>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
