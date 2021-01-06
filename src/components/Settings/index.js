import React from 'react';
import {AuthUserContext, withAuthorization} from '../Session';
import {PasswordForgetForm} from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import * as ROLES from "../../constants/roles";

const SettingsPage = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <h1>Settings</h1>
                            <p className="lead">
                                Review and change your provided information.
                            </p>
                            <ul className="mb-5">
                                <li>
                                    Email: {authUser.email}
                                </li>
                                <li>
                                    Username: {authUser.username}
                                </li>
                                {/* If user is admin - no need to show this */}
                                {!authUser.roles[ROLES.ADMIN] && (
                                    <li>
                                        {authUser.wantAdminPrivileges ? "Admin privileges pending" : "I don't want Admin privileges"}
                                    </li>
                                )
                                }
                                {!!authUser.roles[ROLES.ADMIN] && (
                                    <li>
                                        <p>Admin privileges granted</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="container-fluid">
                            <div className="row mb-5">
                                <div className="col-12 col-lg-8 mb-5 ">
                                    <div className="sms-form-box__neu">
                                        <h2 className="form-header">Reset password</h2>
                                        <PasswordForgetForm/>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <div className="sms-form-box__neu">
                                        <h2 className="form-header">Change my password</h2>
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
