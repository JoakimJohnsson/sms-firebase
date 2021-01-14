import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Modal} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import TitleForm from "./TitleForm";

const TitleModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {t} = useTranslation();
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">{t('administration_title_modal_component_header_add_title')}</h2>
                    <button type="button"
                            className="btn"
                            data-bs-dismiss="modal"
                            aria-label={t('aria_label_close')}
                            onClick={handleClose}>
                        <Icon.X className="fs-1"/>
                    </button>
                </div>
                <Modal.Body className="px-0">
                    <TitleForm/>
                </Modal.Body>
            </Modal>
            <button className="btn" aria-label={t('aria_label_add_title')} onClick={handleShow}>
                <Icon.PlusCircle className="fs-2 me-3"/>
            </button>
        </>
    )
};

export default TitleModal;