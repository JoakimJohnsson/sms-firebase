import React from "react";

const Alert = ({type, message, icon}) => {

    return (
        <div className={`alert alert-${type} d-flex align-items-center`}>
            <div className="pe-3">
                {icon}
            </div>
            {message}
        </div>
    )
};

export default Alert;