import React from 'react';
import shieldBlack from "../../assets/images/shield__black.svg";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const SmsLogo = ({isLoggedIn}) => {
    return (
        <div className={"sms-logo navbar-brand fs-4 text-black"}>
            <Link to={isLoggedIn ? ROUTES.DASHBOARD : ROUTES.HOME} className={"d-flex align-items-center"}>
                <img className="sms-logo__image me-2" src={shieldBlack} alt={"Svenska Marvelsamlare Logo"}/>
                <span className={"sms-logo__text d-none d-sm-inline"}>SVENSKA MARVELSAMLARE</span>
                <span className={"sms-logo__text d-sm-none"}>SMS</span>
            </Link>
        </div>
    )
};

export default SmsLogo;
