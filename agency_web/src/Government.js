import React from 'react';

function Join()  {

    return (
      <div className="Join">
        <h1>Government</h1>
        <input name="join_id" type="text" placeholder="아이디"></input>
        <input name="join_pw" type="passord" placeholder="비밀번호"></input>
        <input name="join_name" type="text" placeholder="이름"></input>
      </div>
    );
}

export default Join;
