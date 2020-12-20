import React from 'react';
import {Link} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {AuthUserContext} from '../Session';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import shieldBlack from "../../assets/images/shield__black.svg";
import shieldWhite from "../../assets/images/shield__white.svg";

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser => authUser ? <HeaderAuth authUser={authUser}/> : <HeaderNonAuth/>}
    </AuthUserContext.Consumer>
);

const HeaderAuth = ({ authUser }) => (
    <header className="container-fluid bg-dark">
        <Navbar className="container" variant="dark" expand="lg">
            <Navbar.Brand>
                <Link to={ROUTES.LANDING}><img src={shieldWhite} /> SVENSKA MARVELSAMLARE</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="d-lg-flex justify-content-end text-end">
                    <NavigationAuth authUser={authUser}/>
            </Navbar.Collapse>
        </Navbar>

    </header>

);

const HeaderNonAuth = () => (
    <header className="container-fluid bg-light">
        <Navbar className="container d-flex justify-content-center" variant="light" expand="lg">
            <Navbar.Brand>
                <Link to={ROUTES.LANDING}><img src={shieldBlack} /></Link>
                <NavigationNonAuth />
            </Navbar.Brand>
        </Navbar>

    </header>

);

const NavigationAuth = ({ authUser }) => (
    <Nav className="">
            <>
                <NavLinkComponent link={ROUTES.LANDING} text={"landing"}/>
                <NavLinkComponent link={ROUTES.HOME} text={"home"}/>
                <NavLinkComponent link={ROUTES.ACCOUNT} text={"account"}/>
                {!!authUser.roles[ROLES.ADMIN] && (
                    <NavLinkComponent link={ROUTES.ADMIN} text={"admin"}/>
                )}
            </>
        <SignOutButton/>
    </Nav>
);

const NavigationNonAuth = () => (
    <Nav className="">
        <NavLinkComponent link={ROUTES.LANDING} text={"landing"}/>
        <NavLinkComponent link={ROUTES.SIGN_IN} text={"signin"}/>
    </Nav>
);

const NavLinkComponent = ({link, text}) => (
    <Link className="nav-link" to={link}>{text}</Link>
);

export default Navigation;
