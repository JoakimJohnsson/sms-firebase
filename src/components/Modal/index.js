import React, {useState} from "react";
import * as Icon from "react-bootstrap-icons";
import {PasswordForgetLink} from "../PasswordForget";
import {Modal} from "react-bootstrap";
import SignInForm from "../SignIn";

const ModalSignIn = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="d-flex flex-column align-items-center">
            <button className="btn btn-primary btn-lg mb-2 d-flex align-items-center" onClick={handleShow}>
                <Icon.DoorOpen className="fs-2 me-3"/>Sign in
            </button>
            <PasswordForgetLink class={'mb-5'}/>
            <Modal show={show} onHide={handleClose}>

                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Sign in</h5>
                    <button type="button"
                            className="btn sms-button__transition"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleClose}>
                        <Icon.X className="fs-1"/>
                    </button>
                </div>

                <Modal.Body>
                    <SignInForm/>
                    <PasswordForgetLink/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const ModalSignUp = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="d-flex flex-column align-items-center">
            <button className="btn btn-outline-primary btn-lg mb-5 d-flex align-items-center" onClick={handleShow}>
                <Icon.HandThumbsUp className="fs-2 me-3"/>Sign up
            </button>

            <Modal show={show} onHide={handleClose}>

                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Sign up</h5>
                    <button type="button"
                            className="btn sms-button__transition"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleClose}>
                        <Icon.X className="fs-1"/>
                    </button>
                </div>

                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalSignIn;
export {ModalSignUp};
