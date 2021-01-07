import React from 'react';
import SignUpForm from '../SignUp';
import {PasswordForgetLink} from "../PasswordForget";
import SignInForm from "../SignIn";
import {useTranslation} from "react-i18next";

const CreateAccountPage = () => {

    const {t} = useTranslation();

    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-12 col-lg-8">
                    <h1>{t('create_account_h1_header_create_account')}</h1>
                    <p className="lead mb-5">
                        {t('lead_create_account')}
                    </p>
                </div>
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-12 col-lg-8 mb-5 mb-lg-0">
                            <div className="me-0 me-lg-3 sms-form-box__neu">
                                <h2 className="form-header">{t('create_account_h2_header_create_account')}</h2>
                                <SignUpForm/>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="sms-form-box__neu">
                                <h2 className="form-header">{t('header_already_member')}</h2>
                                <SignInForm/>
                                <PasswordForgetLink class={"text-end"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CreateAccountPage;
