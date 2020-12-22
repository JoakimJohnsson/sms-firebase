import React from 'react';
import {NavLink} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {AuthUserContext} from '../Session';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SmsLogo from "../Logo";

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser => authUser ? <HeaderAuth authUser={authUser}/> : <HeaderNonAuth/>}
    </AuthUserContext.Consumer>
);

const HeaderAuth = ({authUser}) => (
    <header className="container-fluid bg-dark">
        <Navbar className="container" variant="dark" expand="lg">
            <SmsLogo showWhite={true}/>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="d-lg-flex justify-content-end text-end">
                <NavigationAuth authUser={authUser}/>
            </Navbar.Collapse>
        </Navbar>
    </header>
);

const HeaderNonAuth = () => (
    <header className="container-fluid bg-light">
        <Navbar className="container" variant="light" expand="lg">
            <SmsLogo showWhite={false}/>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="d-lg-flex justify-content-end text-end">
                <NavigationNonAuth/>
            </Navbar.Collapse>
        </Navbar>
    </header>
);

const NavigationAuth = ({authUser}) => (
    <Nav>
        <NavLinkComponent link={ROUTES.DASHBOARD} text={"Dashboard"} isExact={true}/>
        <NavLinkComponent link={ROUTES.ACCOUNT} text={"account"}/>
        {!!authUser.roles[ROLES.ADMIN] && (
            <NavLinkComponent link={ROUTES.ADMIN} text={"admin"}/>
        )}
        <SignOutButton/>
    </Nav>
);

const NavigationNonAuth = () => (
    <Nav className="">
        <NavLinkComponent link={ROUTES.START} text={"Start"} isExact={true}/>
        <NavLinkComponent link={ROUTES.SIGN_IN} text={"Sign in"}/>
    </Nav>
);

const NavLinkComponent = ({link, text, isExact}) => (
    <NavLink className="nav-link" to={link} exact={isExact}>{text}</NavLink>
);

export default Navigation;
