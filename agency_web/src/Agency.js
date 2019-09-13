import React from 'react';

function Agency()  {

    return (
      <div className="Agency">
        <h1>Agency</h1>
        <input name="Agency_HashCode" type="text" placeholder="HashCode"></input>
        <input name="Agency_OTP" type="text" placeholder="OTP"></input>
        <button>Search</button>
      </div>
    );
}

export default Agency;
