import React, {useState} from 'react';
import {Modal} from "react-bootstrap";


function Landing() {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    return (
        <div className="container">
        <div className="row">
        <div className="col-12">
            <h1 className="text-center">Svenska marvelsamlare</h1>


            <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-lg" onClick={handleShow}>
                    Sign in
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

                <button className="btn btn-outline-primary btn-lg" onClick={handleShow2}>
                    Sign up
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
        </div>
        </div>
        </div>
    );
}

export default Landing;