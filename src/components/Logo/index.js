import React from 'react';
import shieldBlack from "../../assets/images/shield__black.svg";
import shieldWhite from "../../assets/images/shield__white.svg";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Navbar from "react-bootstrap/Navbar";



const SmsLogo = (props) => (

    <Navbar.Brand>
        <Link to={ROUTES.START}>
            <img src={props.showWhite ? shieldWhite : shieldBlack} alt={"Svenska Marvelsamlare Logo"} />
            SVENSKA MARVELSAMLARE
        </Link>
    </Navbar.Brand>
);

export default SmsLogo;