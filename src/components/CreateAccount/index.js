import React from 'react';
import SignUpForm from '../SignUp';
import {PasswordForgetLink} from "../PasswordForget";
import SignInForm from "../SignIn";

const CreateAccountPage = () => (
    <div className="container pt-5">
        <div className="row">
            <div className="col-12 col-lg-8">
                <h1>Create account</h1>
                <p className="lead mb-5">
                    This is the lead text. Here is information about this site. To make this longer I put more text here. And even more text.
                </p>
            </div>
            <div className="container-fluid">
            <div className="row mb-5">
                <div className="col-12 col-lg-8 mb-5 mb-lg-0">
                    <div className="me-0 me-lg-3 sms-form-box__neu">
                        <h2 className="form-header">Create account</h2>
                        <SignUpForm/>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="sms-form-box__neu">
                        <h2 className="form-header">Already a member?</h2>
                        <SignInForm/>
                        <PasswordForgetLink class={"text-end"}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
);

export default CreateAccountPage;
