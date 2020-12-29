import React from 'react';
import {withAuthorization} from '../Session';

const DashboardPage = () => (
    <div className="container pt-5">
        <div className="row">
            <div className="col-12 col-lg-8">
                <h1>Dashboard</h1>
                <p>The Home Page is accessible by every signed in user.</p>
            </div>
        </div>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DashboardPage);
