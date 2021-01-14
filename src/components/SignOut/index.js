import React from 'react';

import { withFirebase } from '../Firebase';
import * as Icon from "react-bootstrap-icons";
import {useTranslation} from "react-i18next";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const SignOutButton = ({ firebase }) => {
    const {t} = useTranslation();
    return (
        <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={
                <Tooltip id={"tooltip-sign-out"} className="d-none d-lg-block">
                    {t('tooltip_sign_out')}
                </Tooltip>
            }>
            <button className="btn btn-primary btn__neu ms-lg-3" type="button" onClick={firebase.doSignOut} title="Sign out">
                <Icon.ArrowRightCircle className="fs-4 me-2 me-lg-0"/>
                <span className="d-inline d-lg-none">{t('btn_sign_out')}</span>
            </button>
        </OverlayTrigger>
)};

export default withFirebase(SignOutButton);
