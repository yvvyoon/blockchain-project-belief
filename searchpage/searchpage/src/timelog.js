import React from 'react';
import PropTypes from "prop-types";



function timelog({ number, date, time, type }) {
    return (
        <div className="timelog">
            <table>
                <tr>
                    <td className="tb_width">{number}</td>
                    <td className="tb_width">{date}</td>
                    <td className="tb_width">{time}</td>
                    <td className="tb_width">{type}</td>
                </tr>
            </table>
        </div>
    );
}
timelog.ProtoTypes = {
    number: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};
export default timelog;