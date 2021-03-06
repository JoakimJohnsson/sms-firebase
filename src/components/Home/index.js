import React from 'react';
import {ModalCreateAccount} from "../Modal";
import ModalSignIn from "../Modal";
import {useTranslation} from "react-i18next";

const HomePage = () => {

    const {t} = useTranslation();

    return (
        <div className="container text-center pt-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">{t('home_header_welcome')}</h1>
                    <p className="fs-4">Do you collect swedish marvel comics?</p>
                    <p className="fs-4 mb-5">This app helps you keep track of your collection.</p>
                    <ModalSignIn/>
                    <ModalCreateAccount/>
                    <footer className="d-flex justify-content-center">
                        <div className="col-12 col-lg-8 pt-5">
                            <p className="fs-sms-sm">
                                {t('home_disclaimer_part_1')}
                                <a href="http://www.marvel.com">MARVEL Entertainment</a>
                                {t('home_disclaimer_part_2')}
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
};

export default HomePage;
