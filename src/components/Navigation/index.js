import React from 'react';
import {NavLink} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {AuthUserContext} from '../Session';
import SmsLogo from "../Logo";
import * as Icon from 'react-bootstrap-icons';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

const HeaderNavigation = () => (
    <AuthUserContext.Consumer>
        {authUser => authUser ? <HeaderAuth authUser={authUser}/> : <HeaderNonAuth/>}
    </AuthUserContext.Consumer>
);

const HeaderAuth = ({authUser}) => (
    <header className="container-fluid bg-dark px-3">
        <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
            <Navbar.Brand><SmsLogo isLoggedIn={true}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarAuthToggler"/>
            <Navbar.Collapse id="navbarAuthToggler">
                <Nav className="mr-auto">
                    <NavLinkComponentWithIcon link={ROUTES.DASHBOARD} text={"Dashboard"} isExact={true} icon={<Icon.Tools className="fs-5 me-1"/>}/>
                    <NavLinkComponentWithIcon link={ROUTES.SETTINGS} text={" Settings"} icon={<Icon.Gear className="fs-5 me-1"/>}/>
                    {!!authUser.roles[ROLES.ADMIN] && (
                        <NavLinkComponentWithIcon link={ROUTES.ADMIN} text={"Admin"} icon={<Icon.Bug className="fs-5 me-1"/>}/>
                    )}
                    <SignOutButton/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
);

const HeaderNonAuth = () => (
    <header className="container-fluid bg-light px-3">
        <Navbar bg="light" expand="lg" className="fixed-top">
            <Navbar.Brand><SmsLogo isLoggedIn={false}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNonAuthToggler"/>
            <Navbar.Collapse id="navbarNonAuthToggler">
                <Nav className="mr-auto">
                    <NavLinkComponent link={ROUTES.START} text={"Start"} isExact={true}/>
                    <NavLinkComponent link={ROUTES.CREATE_ACCOUNT} text={"Create account"}/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
);

const NavLinkComponent = ({link, text, isExact}) => (
    <NavLink className="nav-link" to={link} exact={isExact}>{text}</NavLink>
);
const NavLinkComponentWithIcon = ({link, text, isExact, icon}) => (
    <NavLink className="nav-link" to={link} exact={isExact}>{icon} {text}</NavLink>
);

export default HeaderNavigation;
