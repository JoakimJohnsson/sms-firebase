import React from 'react';
import {AuthUserContext, withAuthorization} from '../Session';
import firebase from "firebase";
import {PasswordForgetForm} from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import * as ROLES from "../../constants/roles";
import * as LOCALE from "../../constants/locales";
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const SettingsPage = () => {

    const {t} = useTranslation();
    const registerDate = new Date(firebase.auth().currentUser.metadata.creationTime);
    const registerDateSv = registerDate.toLocaleDateString(LOCALE.SV)
    const registerDateEn = registerDate.toLocaleDateString(LOCALE.EN)

    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <h1>{t('settings_header_settings')}</h1>
                            <p className="lead mb-5">
                                {t('settings_lead_settings')}
                            </p>
                            <h2 className="mb-3">{t('settings_header_personal_information')}</h2>
                            <ul className="list-group list-group-flush list-group__neu list-group__shaded mb-5">
                                <li className="list-group-item">
                                    {t('list_email')}{authUser.email}
                                </li>
                                <li className="list-group-item">
                                    {t('list_register_date')}{i18n.language === "sv" ? registerDateSv:registerDateEn}
                                </li>
                                <li className="list-group-item">
                                    {t('list_firstname')}<span className="text-capitalize">{authUser.firstname}</span>
                                </li>
                                <li className="list-group-item">
                                    {t('list_lastname')}<span className="text-capitalize">{authUser.lastname}</span>
                                </li>
                                <li className="list-group-item">
                                    {t('list_role')}<span className="text-capitalize">{!authUser.roles[ROLES.ADMIN] ? t('list_role_not_admin')  : t('list_role_admin')}</span>
                                </li>
                                {/* If user is admin - no need to show this */}
                                {!authUser.roles[ROLES.ADMIN] && (
                                    <li className="list-group-item">
                                        {authUser.wantAdminPrivileges ? t('list_admin_pending') : t('list_admin_unwanted')}
                                    </li>
                                )
                                }
                                {!!authUser.roles[ROLES.ADMIN] && (
                                    <li className="list-group-item">
                                        {t('list_admin_granted')}
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="container-fluid">
                            <div className="row mb-5">
                                <div className="col-12 col-lg-8 mb-5 ">
                                    <div className="sms-form-box__neu">
                                        <h2 className="form-header">{t('header_reset_password')}</h2>
                                        <PasswordForgetForm/>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <div className="sms-form-box__neu">
                                        <h2 className="form-header">{t('header_change_password')}</h2>
                                        <PasswordChangeForm/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthUserContext.Consumer>
    )
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(SettingsPage);
