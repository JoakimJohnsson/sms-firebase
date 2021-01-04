import React from 'react';
import {AuthUserContext, withAuthorization} from '../Session';
import {PasswordForgetForm} from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const SettingsPage = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <h1>Settings: {authUser.email}</h1>
                            <p className="lead mb-5">
                                This is the lead text. Here is information about this site. To make this longer I put more text here. And even more
                                text.
                            </p>
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
