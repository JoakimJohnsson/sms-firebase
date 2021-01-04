import React from 'react';
import '../../assets/scss/main.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HeaderNavigation from '../Navigation';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import DashboardPage from "../Dashboard";
import StartPage from "../Start";
import CreateAccountPage from "../CreateAccount";
import {withAuthentication} from '../Session';
import * as ROUTES from '../../constants/routes';

const App = () => (
    <Router>
        <>
            <HeaderNavigation/>
            <Route exact path={ROUTES.START} component={StartPage}/>
            <Route path={ROUTES.CREATE_ACCOUNT} component={CreateAccountPage}/>
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
            <Route path={ROUTES.DASHBOARD} component={DashboardPage}/>
            <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
            <Route path={ROUTES.ADMIN} component={AdminPage}/>
        </>
    </Router>
);

export default withAuthentication(App);
