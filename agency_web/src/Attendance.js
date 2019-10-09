import React from 'react';

function Attendance()  {

    return (
      <div style={styles.div} className="Attendance">
        <form method = "GET" action = "/">
          <h1 style={styles.h1}>Attendance</h1>
          <input style= {styles.input} name="Attendance_NFC" type="text" placeholder="NFC"></input>
          <button type="submit">Check</button>
        </form>
        <p>NAME</p><input style= {styles.input} name="Attendance_NAME" type="text" placeholder="NAME" disabled></input>
        <p>DEPARTMENT</p><input style= {styles.input} name="Attendance_DEPARTMENT" type="text" placeholder="DEPARTMENT" disabled></input>
        <p>TIME</p><input style= {styles.input} name="Attendance_TIME" type="text" placeholder="TIME" disabled></input>
        <p>RESULT</p><input style= {styles.input} name="Attendance_RESULT" type="text" placeholder="RESULT" disabled></input>
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

export default Attendance;
