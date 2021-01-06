import React from 'react';

import { withFirebase } from '../Firebase';
import * as Icon from "react-bootstrap-icons";

const SignOutButton = ({ firebase }) => (
    <button className="btn btn-primary ms-lg-3" type="button" onClick={firebase.doSignOut} title="Sign out">
        <Icon.ShieldLock className="fs-4 me-2 me-lg-0"/>
        <span className="d-lg-none">Sign Out</span>
    </button>
);

export default withFirebase(SignOutButton);
