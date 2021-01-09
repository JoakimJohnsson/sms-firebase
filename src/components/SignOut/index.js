import React from 'react';

import { withFirebase } from '../Firebase';
import * as Icon from "react-bootstrap-icons";
import {useTranslation} from "react-i18next";

const SignOutButton = ({ firebase }) => {
    const {t} = useTranslation();
    return (
    <button className="btn btn-primary ms-lg-3" type="button" onClick={firebase.doSignOut} title="Sign out">
        <Icon.ArrowRightCircle className="fs-4 me-2 me-lg-0"/>
        <span className="d-inline d-lg-none">{t('btn_sign_out')}</span>
    </button>
)};

export default withFirebase(SignOutButton);
