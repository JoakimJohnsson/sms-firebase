import {useTranslation} from "react-i18next";
import React from "react";
import Title from "./TitleBase";
import TitleModal from "./TitleModal";

const Titles = () => {
    const {t} = useTranslation();
    return (
        <div className="col-12 mb-3">
            <div className="card">
                <div className="card-header p-3 d-flex justify-content-between align-items-center">
                    <h3 className="m-0">{t('administration_title_card_component_header_titles')}</h3>
                    <TitleModal/>
                </div>
                <div className="card-body">
                    <Title/>
                </div>
            </div>
        </div>
    )
};

export default Titles;