import React from 'react';
import {ModalCreateAccount} from "../Modal";
import ModalSignIn from "../Modal";
import {useTranslation} from "react-i18next";

const StartPage = () => {

    const {t, i18n} = useTranslation();

    return (
        <div className="container text-center pt-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-uppercase mb-5">{t('sms-greeting')}</h1>
                    <ModalSignIn/>
                    <ModalCreateAccount/>
                    <footer className="d-flex justify-content-center">
                        <div className="col-12 col-lg-8 pt-5">
                            <p className="small">
                                This webb application contains images and information which is owned and
                                copyrighted by <a href="http://www.marvel.com">MARVEL Entertainment</a> and is
                                used without permission according to the Fair use doctrin of the United States.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
};

export default StartPage;
