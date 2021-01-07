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
                    <h1 className="text-uppercase mb-5">{t('header_welcome')}</h1>
                    <ModalSignIn/>
                    <ModalCreateAccount/>
                    <footer className="d-flex justify-content-center">
                        <div className="col-12 col-lg-8 pt-5">
                            <p className="small">
                                {t("disclaimer_part_1")}
                                <a href="http://www.marvel.com">MARVEL Entertainment</a>
                                {t("disclaimer_part_2")}
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
};

export default HomePage;
