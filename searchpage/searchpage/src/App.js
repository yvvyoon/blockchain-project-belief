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
    isLogin: true, // 로그인이 필요한지 여부
    isTimeLog: false, // 타임로그가 나오는지 여부
    isAdmin: false,// 관리자인지 여부
    login: false, // 로그인이 되었는지 여부
    name: '', // 이름
    admin: '', // 관리자
    id: '', // id
    pw: '', // pw
    Timelogs: [], // Timelogs 이름의 배열
    total: 0, // 개인 종합 시간
    dept: '', // 부서
    FinalResultArr: [] // FinalResultArr 이름의 관리자 전용 배열
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      id: e.target.value,
    });
  };
  pwChange = (e) => {
    e.preventDefault();
    this.setState({
      pw: e.target.value,
    });
  };

  pushLogin = (e) => { // 로그인 버튼을 눌렀을 때
    this.login(); // login 함수 실행
    this.TimeLog(); // TimeLog 함수 실행
    e.preventDefault();
  }
  isLogin = () => {
    this.setState({ isLogin: true, isTimeLog: false, isAdmin: false })
    // state 값 변경
  }
  isTimeLog = () => {
    this.setState({ isLogin: false, isTimeLog: true, isAdmin: false })
    // state 값 변경
  }
  isAdminTimeLog = () => {
    this.setState({ isLogin: false, isTimeLog: true, isAdmin: true })
    // state 값 변경
  }
  isAdmin = () => {
    this.setState({ isLogin: false, isTimeLog: false, isAdmin: true, login: true })
    // state 값 변경

  }

  login = async () => { // 로그인 시도시
    const { // name, admin, dept 값 가져옴
      data: {
        name,
        admin,
        dept
      }
    }
      = await axios.get('http://70.12.229.178:9000/login', {
        params: {
          id: this.state.id, // 현재 상태의 id 값 전송
          pw: this.state.pw, // 현재 상태의 pw 값 전송
        }
      })
      await console.log("name:", name, "admin:", admin, "dept:", dept, "this.state.isAdmin:", this.state.isAdmin);
    await this.setState({ isLogin: false, isTimeLog: true, isAdmin: admin, admin, login: true, name, dept })
    await console.log("name:", name, "admin:", admin, "dept:", dept, "this.state.isAdmin:", this.state.isAdmin);
  }


  Logout = () => { // 로그아웃시

    this.setState({ id: '', pw: '', isLogin: true, isTimeLog: false, isAdmin: false, login: false }) //수정 부분
  }

  TimeLog = async () => { // TimeLog 함수 호출
    const {
      data: {
        totalArr, // totalArr 값 불러옴
        total // total 값 불러옴
      }
    }
      = await axios.get('http://70.12.229.178:9000/timelogs', {
        params: {
          id: this.state.id // 현재 state의 id 가져옴
        }
      })
          await console.log("totalArr : ", totalArr);
    await this.setState({ Timelogs: totalArr, total }) //totalArr를 Timelogs에 넣음

  }

  Admin = async () => { // Admin 함수 호출
    this.isAdmin(); // isAdmin 함수 호출 (state값 변경)

    await console.log("this.state.name :", this.state.name, "this.state.admin :", this.state.admin, "this.state.dept :", this.state.dept, "this.state.isAdmin :", this.state.isAdmin);
    await console.log(this.state.FinalResultArr);

    const {
      data: {
        FinalResultArr // FinalResultArr 값 불러옴
      }
    }
      = await axios.get('http://70.12.229.178:9000/admins', {
                params: {
                  dept: this.state.dept, // 현재 상태의 dept 전송
                  admin: this.state.isAdmin, // 현재 상태의 isAdmin 전송
                  id: this.state.id // 현재 상태의 id 전송
               }
      })
          await console.log("FinalResultArr : ", FinalResultArr);
    await this.setState({ FinalResultArr }) // FinalResultArr 현재 state에 저장
    await console.log("this.state.FinalResultArr : ", this.state.FinalResultArr);
  }


  render() {
    const { isLogin, isTimeLog, isAdmin, login, Timelogs, FinalResultArr } = this.state;
    // 현재 state의 값 불러옴
    return (
      <div className="App">
        <div className="sidebar">
          <ul className="logo">
            <li><p className="logo"><img className="logo" src={beliefPng} alt=""/><p className="logotext">Belief</p></p></li>
          </ul>
          {login ? // login 여부
            isAdmin ? // 관리자 여부
            // 로그인이 된 관리자의 sidebar
                <ul className="sidenav">
                  <li><p onClick={this.Logout}><img src={userPng} alt=""/>로그아웃</p></li>
                  <li><p onClick={this.isAdminTimeLog}><img src={filePng} alt=""/>근태기록</p></li>
                  <li><p onClick={this.Admin}><img src={padlockPng} alt=""/>부서별조회</p></li>
                </ul>
              :
              // 로그인이 된 비관리자의 sidebar
              <ul className="sidenav">
                <li><p onClick={this.Logout}><img src={userPng} alt=""/>로그아웃</p></li>
                <li><p onClick={this.isTimeLog}><img src={filePng} alt=""/>근태기록</p></li>
              </ul>
            :
            // 로그인이 되지 않은 사용자
            <ul className="sidenav">
              <li><p onClick={this.isLogin}><img src={userPng} alt=""/>로그인</p></li>
            </ul>
          }
        </div>
        <div className="main">
          {isLogin ? // 로그인이 필요한지 여부
          // 로그인 필요함
            <form action="" method="post">
              <div className="container">
                <label><b>사원번호</b></label>
                <input type="text" value={this.state.id} onChange={this.handleChange} placeholder="사원번호를 입력해주세요." />
                <label><b>비밀번호</b></label>
                <input type="password" value={this.state.pw} onChange={this.pwChange} placeholder="비밀번호를 입력해주세요." />
                <button type="submit" onClick={this.pushLogin}>로그인</button>
              </div>
            </form>
            // 로그인이 필요하지 않음
            //TimeLog 호출시  
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
                    id={this.state.id}
                    date={timelog.date}
                    time={timelog.time}
                    type={timelog.type} />
                ))}
                <p>이번 주 총 근무시간은 {this.state.total}분 입니다.</p>
              </div>
              :
              // TimeLog 비호출시
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
                {FinalResultArr.map(FinalResultArr => (
                  <Admin
                    dept={FinalResultArr.FinDept}
                    id={FinalResultArr.FinNum}
                    name={FinalResultArr.FinName}
                    total={FinalResultArr.FinTotalTime}
                  />
                ))}
                <p>10/14(월)~10/16(수) {this.state.dept}팀의 조회 내역입니다.</p>
              </div>
          }
        </div>
      </div>
    );
  }
}


export default App;
