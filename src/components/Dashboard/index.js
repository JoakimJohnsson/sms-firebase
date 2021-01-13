import React from 'react';
import {withAuthorization} from '../Session';
import {useTranslation} from "react-i18next";

const DashboardPage = () => {

    const {t} = useTranslation();

    return (
    <div className="container pt-5">
        <div className="row">
            <div className="col-12 col-lg-8">
                <h1>{t('dashboard_header_dashboard')}</h1>
                <p>{t('dashboard_lead_dashboard')}</p>
            </div>
        </div>
    </div>
)};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DashboardPage);
