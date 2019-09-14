import React from 'react';

function Join()  {

    return (
      <div className="Join">
        <h1 style={styles.h1} >Government</h1>
        <input style={styles.input} name="join_id" type="text" placeholder="아이디"></input>
        <input style={styles.input} name="join_pw" type="password" placeholder="비밀번호"></input>
        <input style={styles.input} name="join_name" type="text" placeholder="이름"></input>
      </div>
    );
}

const styles = {
  h1 : {
    marginTop : '50px',
  },
  input : {
    width : '70%',
    margin: '25px',
    textAlign: 'center'
  }
}

export default Join;
