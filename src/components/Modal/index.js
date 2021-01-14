import React, {useState} from "react";
import * as Icon from "react-bootstrap-icons";
import {PasswordForgetLink} from "../PasswordForget";
import {Modal} from "react-bootstrap";
import SignInForm from "../SignIn";
import SignUpForm from "../SignUp";
import {useTranslation} from "react-i18next";

const ModalSignIn = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {t} = useTranslation();
    return (
        <div className="d-flex flex-column align-items-center">
            <button className="btn btn-primary btn__neu sms-button__cta mb-2" onClick={handleShow}>
                <Icon.DoorOpen className="fs-2 me-2"/>
                <span>{t('btn_sign_in')}</span>
            </button>
            <PasswordForgetLink class={'mb-5'}/>
            <Modal show={show} onHide={handleClose}>

                <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">{t('home_modal_header_sign_in')}</h2>
                    <button type="button"
                            className="btn"
                            data-bs-dismiss="modal"
                            aria-label={t('aria_label_close')}
                            onClick={handleClose}>
                        <Icon.X className="fs-1"/>
                    </button>
                </div>

                <Modal.Body className="px-0">
                    <SignInForm/>
                    <PasswordForgetLink class={"text-end"}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

const ModalCreateAccount = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {t} = useTranslation();
    return (
        <div className="d-flex flex-column align-items-center">
            <button className="btn btn__neu btn-outline-secondary sms-button__cta mb-5" onClick={handleShow}>
                <Icon.HandThumbsUp className="fs-2 me-2"/>
                <span>{t('btn_create_account')}</span>
            </button>

            <Modal show={show} onHide={handleClose}>

                <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">{t('create_account_modal_header_create_account')}</h2>
                    <button type="button"
                            className="btn"
                            data-bs-dismiss="modal"
                            aria-label={t('aria_label_close')}
                            onClick={handleClose}>
                        <Icon.X className="fs-1"/>
                    </button>
                </div>

                <Modal.Body className="px-0">
                    <SignUpForm/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalSignIn;
export {ModalCreateAccount};
