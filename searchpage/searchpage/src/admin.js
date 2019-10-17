import React from 'react';
import PropTypes from "prop-types";



function admin({dept, id, name, total}) {
    return(
        <div className="admin">
            <table>
                <tr>
                    <td className="tb_width">{dept}</td>
                    <td className="tb_width">{id}</td>
                    <td className="tb_width">{name}</td>
                    <td className="tb_width">{total}</td>
                </tr>
            </table>
        </div>
    );
}
admin.ProtoTypes = {
    dept: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
};
export default admin;