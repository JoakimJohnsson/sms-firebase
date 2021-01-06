import React from 'react';

import { withFirebase } from '../Firebase';
import * as Icon from "react-bootstrap-icons";

const SignOutButton = ({ firebase }) => (
    <button className="btn btn-primary ms-lg-3" type="button" onClick={firebase.doSignOut} title="Sign out">
        <Icon.ShieldLock className="fs-4 me-2 me-lg-0 me-xl-2"/>
        <span className="d-inline d-lg-none d-xl-inline">Sign Out</span>
    </button>
);

export default withFirebase(SignOutButton);
