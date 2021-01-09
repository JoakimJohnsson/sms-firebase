import React from 'react';
import {AuthUserContext, withAuthorization} from '../Session';
import {PasswordForgetForm} from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import * as ROLES from "../../constants/roles";
import {useTranslation} from "react-i18next";

const SettingsPage = () => {

    const {t} = useTranslation();

    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <h1>{t('settings_header_settings')}</h1>
                            <p className="lead">
                                {t('settings_lead_settings')}
                            </p>
                            <ul className="mb-5">
                                <li>
                                    {t('list_email')}{authUser.email}
                                </li>
                                <li>
                                    {t('list_username')}<span className="text-capitalize">{authUser.username}</span>
                                </li>
                                {/* If user is admin - no need to show this */}
                                {!authUser.roles[ROLES.ADMIN] && (
                                    <li>
                                        {authUser.wantAdminPrivileges ? t('list_admin_pending') : t('list_admin_unwanted')}
                                    </li>
                                )
                                }
                                {!!authUser.roles[ROLES.ADMIN] && (
                                    <li>
                                        <p>{t('list_admin_granted')}</p>
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
