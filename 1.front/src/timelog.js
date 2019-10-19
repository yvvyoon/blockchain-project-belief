import React from 'react';
import PropTypes from "prop-types";



function timelog({ id, date, time, type }) {
    return (
        <div className="timelog">
            <table>
                <tr>
                    <td className="tb_width">{id}</td>
                    <td className="tb_width">{date}</td>
                    <td className="tb_width">{time}</td>
                    <td className="tb_width">{type}</td>
                </tr>
            </table>
        </div>
    );
}
timelog.ProtoTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};
export default timelog;