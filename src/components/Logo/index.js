import React from 'react';
import shieldBlack from "../../assets/images/shield__black.svg";
import shieldWhite from "../../assets/images/shield__white.svg";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const SmsLogo = (props) => (

    <div className={"sms-logo navbar-brand " + (props.showWhite ? "text-white" : "text-black")}>
        <Link to={ROUTES.START} className={"d-flex align-items-center"}>
            <img className="sms-logo__image me-2" src={props.showWhite ? shieldWhite : shieldBlack} alt={"Svenska Marvelsamlare Logo"} />
                <span className={"sms-logo__text"}>SVENSKA MARVELSAMLARE</span>
        </Link>
    </div>
);

export default SmsLogo;
