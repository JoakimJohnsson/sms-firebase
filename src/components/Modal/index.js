import React, {useState} from "react";
import * as Icon from "react-bootstrap-icons";
import {PasswordForgetLink} from "../PasswordForget";
import {Modal} from "react-bootstrap";
import SignInForm from "../SignIn";
import SignUpForm from "../SignUp";

const ModalSignIn = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="d-flex flex-column align-items-center">
            <button className="btn btn-primary btn__neu sms-button__cta mb-2" onClick={handleShow}>
                <Icon.DoorOpen className="fs-2 me-3"/>
                <span>Sign in</span>
            </button>
            <PasswordForgetLink class={'mb-5'}/>
            <Modal show={show} onHide={handleClose}>

                <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">Sign in</h2>
                    <button type="button"
                            className="btn"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleClose}>
                        <Icon.X className="fs-1"/>
                    </button>
                </div>

                <Modal.Body>
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
    return (
        <div className="d-flex flex-column align-items-center">
            <button className="btn btn__neu btn-outline-secondary sms-button__cta mb-5" onClick={handleShow}>
                <Icon.HandThumbsUp className="fs-2 me-3"/>
                <span>Create account</span>
            </button>

            <Modal show={show} onHide={handleClose}>

                <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">Sign up</h2>
                    <button type="button"
                            className="btn"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleClose}>
                        <Icon.X className="fs-1"/>
                    </button>
                </div>

                <Modal.Body>
                    <SignUpForm/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalSignIn;
export {ModalCreateAccount};
