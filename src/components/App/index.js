import React from 'react';
import '../../assets/scss/main.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HeaderNavigation from '../Navigation';
import PasswordForgetPage from '../PasswordForget';
import SettingsPage from '../Settings';
import AdministrationPage from '../Administration';
import DashboardPage from "../Dashboard";
import StartPage from "../Start";
import CreateAccountPage from "../CreateAccount";
import {withAuthentication} from '../Session';
import * as ROUTES from '../../constants/routes';

const App = () => (
    <Router>
        <>
            <div className="top-spacer"> </div>
            <HeaderNavigation/>
            <Route exact path={ROUTES.START} component={StartPage}/>
            <Route path={ROUTES.CREATE_ACCOUNT} component={CreateAccountPage}/>
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
            <Route path={ROUTES.DASHBOARD} component={DashboardPage}/>
            <Route path={ROUTES.SETTINGS} component={SettingsPage}/>
            <Route path={ROUTES.ADMIN} component={AdministrationPage}/>
        </>
    </Router>
);

export default withAuthentication(App);
