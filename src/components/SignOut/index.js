import React from 'react';

import { withFirebase } from '../Firebase';
import * as Icon from "react-bootstrap-icons";

const SignOutButton = ({ firebase }) => (
    <button className="btn btn-primary ms-lg-3" type="button" onClick={firebase.doSignOut}>
        <Icon.ShieldLock className="fs-4 me-2"/>Sign Out
    </button>
);

export default withFirebase(SignOutButton);
