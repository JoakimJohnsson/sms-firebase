import React, {useState} from "react";
import * as Icon from "react-bootstrap-icons";
import {PasswordForgetLink} from "../PasswordForget";
import {Modal} from "react-bootstrap";
import {SignInForm} from "../SignIn";
import {SignUpLink} from "../SignUp";

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
                <Modal.Header closeButton>
                    <Modal.Title>Sign in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignInForm/>
                    <PasswordForgetLink/>
                    <SignUpLink/>
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
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return (
        <div className="d-flex flex-column align-items-center">
            <button className="btn btn-outline-primary btn-lg mb-5 d-flex align-items-center" onClick={handleShow2}>
                <Icon.HandThumbsUp className="fs-2 me-3"/>Sign up
            </button>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose2}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleClose2}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalSignIn;
export {ModalSignUp};
