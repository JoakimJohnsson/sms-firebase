import React from 'react';
import {useTranslation} from "react-i18next";

const LoadingComponent = () => {
    const {t} = useTranslation();
    return (
    <div className="">
        {t('label_loading')}
    </div>
)};

export default LoadingComponent;
