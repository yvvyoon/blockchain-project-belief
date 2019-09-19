import React from 'react';

function User()  {

    return (
      <div style={styles.div} className="User">
        <h1 style={styles.h1}>User</h1>
        <input style= {styles.input} name="User_HashCode" type="tel" placeholder="핸드폰 번호를 입력해주세요"></input>
        {/* <input style= {styles.input} name="User_HashCode" type="text" placeholder="HashCode"></input>
        <input style= {styles.input} name="User_OTP" type="text" placeholder="OTP"></input> */}
        <button>Search</button>
      </div>
    );
}

const styles = {
  h1 : {
    marginTop : '50px',
  },
  input : {
    width : '50%',
    margin: '25px',
    textAlign: 'center'
  }
}

export default User;
