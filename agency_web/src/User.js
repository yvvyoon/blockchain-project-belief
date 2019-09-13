import React from 'react';

function User()  {

    return (
      <div className="User">
        <h1>User</h1>
        <input name="User_HashCode" type="text" placeholder="HashCode"></input>
        <input name="User_OTP" type="text" placeholder="OTP"></input>
        <button>Search</button>
      </div>
    );
}

export default User;
