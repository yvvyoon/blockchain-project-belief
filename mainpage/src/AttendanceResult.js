import React from 'react';
import PropTypes from "prop-types";

function AttendanceResult({name, time, type}) {
  return (
    <div className="AttendanceResult">
      <p className="name">이름 : {name}</p>
      <p className="time">출입 시간 : {time}</p>
      <p className="type">출입 유형 : {type}</p>
    </div>
  );
}

AttendanceResult.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};


export default AttendanceResult;
