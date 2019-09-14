import React from 'react';

function Agency()  {

    return (
      <div className="Agency">
        <h1 style={styles.h1}>Agency</h1>
        <input style={styles.input} name="Agency_HashCode" type="text" placeholder="HashCode"></input>
        <input style={styles.input} name="Agency_OTP" type="text" placeholder="OTP"></input>
        <button>Search</button>
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

export default Agency;
