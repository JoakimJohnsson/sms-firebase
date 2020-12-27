import React from 'react';
import SignUpForm from '../SignUp';
import {PasswordForgetLink} from "../PasswordForget";
import SignInForm from "../SignIn";

const CreateAccountPage = () => (
    <div className="container pt-5">
        <div className="row">
            <div className="col-12 ">
                <h1>Create account</h1>
                <p className="lead">Hello friend!</p>
                <p>Hello friend!</p>

                <h2>Create account</h2>
                <SignUpForm/>

                <h2>Already a member?</h2>
                <SignInForm/>
                <PasswordForgetLink/>
            </div>
        </div>
    </div>
);

export default CreateAccountPage;
