import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {AuthUserContext} from '../Session';
import SmsLogo from "../Logo";
import * as Icon from 'react-bootstrap-icons';
import {Nav, Navbar} from "react-bootstrap";

const HeaderNavigation = () => (
    <AuthUserContext.Consumer>
        {authUser => authUser ? <HeaderAuth authUser={authUser}/> : <HeaderNonAuth/>}
    </AuthUserContext.Consumer>
);

const HeaderAuth = ({authUser}) => {

    const [expanded, setExpanded] = useState(false);

    return (
        <header className="container-fluid bg-dark px-3">
            <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top" expanded={expanded}>
                <Navbar.Brand><SmsLogo isLoggedIn={true}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarAuthToggler" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                <Navbar.Collapse id="navbarAuthToggler">
                    <Nav className="mr-auto">
                        <NavLinkComponentWithIcon link={ROUTES.DASHBOARD} text={"Dashboard"} isExact={true}
                                                  icon={<Icon.Tools className="fs-5 me-1"/>} setExpanded={setExpanded}/>
                        <NavLinkComponentWithIcon link={ROUTES.SETTINGS} text={" Settings"} icon={<Icon.Gear className="fs-5 me-1"/>} setExpanded={setExpanded}/>
                        {!!authUser.roles[ROLES.ADMIN] && (
                            <NavLinkComponentWithIcon link={ROUTES.ADMIN} text={"Admin"} icon={<Icon.Bug className="fs-5 me-1"/>} setExpanded={setExpanded}/>
                        )}
                        <SignOutButton/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
};

const HeaderNonAuth = () => {

    const [expanded, setExpanded] = useState(false);

    return (
        <header className="container-fluid bg-light px-3">
            <Navbar bg="light" expand="lg" className="fixed-top" expanded={expanded}>
                <Navbar.Brand><SmsLogo isLoggedIn={false}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNonAuthToggler" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                <Navbar.Collapse id="navbarNonAuthToggler">
                    <Nav className="mr-auto">
                        <NavLinkComponent link={ROUTES.START} text={"Start"} isExact={true} setExpanded={setExpanded}/>
                        <NavLinkComponent link={ROUTES.CREATE_ACCOUNT} text={"Create account"} setExpanded={setExpanded}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
};

const NavLinkComponent = ({link, text, isExact, setExpanded}) => (
    <NavLink className="nav-link" to={link} exact={isExact} onClick={() => setExpanded(false)}>{text}</NavLink>
);
const NavLinkComponentWithIcon = ({link, text, isExact, icon, setExpanded}) => (
    <NavLink className="nav-link" to={link} exact={isExact} onClick={() => setExpanded(false)}>{icon} {text}</NavLink>
);

export default HeaderNavigation;
