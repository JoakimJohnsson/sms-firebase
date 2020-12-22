import React from 'react';
import '../../assets/scss/main.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import {withAuthentication} from '../Session';
import * as ROUTES from '../../constants/routes';
import DashboardPage from "../Dashboard";
import StartPage from "../Start";

const App = () => (
    <Router>
        <div>
            <Navigation/>
            <Route exact path={ROUTES.START} component={StartPage}/>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
            <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
            <Route path={ROUTES.DASHBOARD} component={DashboardPage}/>
            <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
            <Route path={ROUTES.ADMIN} component={AdminPage}/>
        </div>
    </Router>
);

export default withAuthentication(App);
