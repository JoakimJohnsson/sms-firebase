import React from 'react';
import {AuthUserContext, withAuthorization} from '../Session';
import {PasswordForgetForm} from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <h1>Account: {authUser.email}</h1>
                            <h2>Reset password</h2>
                            <PasswordForgetForm/>
                            <h2>Change my password</h2>
                            <PasswordChangeForm/>
                        </div>
                    </div>
                </div>
            )}
        </AuthUserContext.Consumer>
    )
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);
