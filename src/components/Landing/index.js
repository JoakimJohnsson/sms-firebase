import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

function Landing() {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    return (
        <div className="container text-center pt-5">
            <div className="row">
                <div className="col-12 ">
                    <h1 className="text-uppercase mb-5">Svenska marvelsamlare</h1>

                    <p>Please sign in to start your collection.</p>

                    <div className="d-flex flex-column align-items-center">
                        <button className="btn btn-primary btn-lg mb-5 d-flex align-items-center" onClick={handleShow}>
                            <Icon.DoorOpen className="fs-2 me-3"/>Sign in
                        </button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sign in</Modal.Title>
                            </Modal.Header>
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

                        <p>Don't have an account?</p>

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

                        <div className="col-12 col-lg-8 pt-5">
                            <p className="small">
                                This webb application contains images and information which is owned and
                                copyrighted by <a href="http://www.marvel.com">MARVEL Entertainment</a> and is
                                used without permission according to the Fair use doctrin of the United States.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
