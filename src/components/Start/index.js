import React from 'react';
import {ModalSignUp} from "../Modal";
import ModalSignIn from "../Modal";

const StartPage = () => (

    <div className="container text-center pt-5">
        <div className="row">
            <div className="col-12 ">
                <h1 className="text-uppercase mb-5">Svenska marvelsamlare</h1>
                <ModalSignIn/>
                <ModalSignUp/>
                <footer className="d-flex justify-content-center">
                    <div className="col-12 col-lg-8 pt-5">
                        <p className="small">
                            This webb application contains images and information which is owned and
                            copyrighted by <a href="http://www.marvel.com">MARVEL Entertainment</a> and is
                            used without permission according to the Fair use doctrin of the United States.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    </div>
)

export default StartPage;
