import React from 'react';
import {NavLink} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {AuthUserContext} from '../Session';
import SmsLogo from "../Logo";
import * as Icon from 'react-bootstrap-icons';

const HeaderNavigation = () => (
    <AuthUserContext.Consumer>
        {authUser => authUser ? <HeaderAuth authUser={authUser}/> : <HeaderNonAuth/>}
    </AuthUserContext.Consumer>
);

const HeaderAuth = ({authUser}) => (
    <header className="container-fluid bg-dark px-3">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <SmsLogo isLoggedIn={true}/>
                <button className="navbar-toggler pe-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarAuthToggler"
                        aria-controls="navbarAuthToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <Icon.List className="fs-1 sms-burger-icon"/>
                    <Icon.X className="fs-1 sms-burger-icon__expanded"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarAuthToggler">
                    <ul className="navbar-nav">
                        <NavigationAuth authUser={authUser}/>
                    </ul>
                </div>
        </nav>
    </header>
);

const HeaderNonAuth = () => (
    <header className="container-fluid bg-light px-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <SmsLogo isLoggedIn={false}/>
                <button className="navbar-toggler pe-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNonAuthToggler"
                        aria-controls="navbarNonAuthToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <Icon.List className="fs-1 sms-burger-icon"/>
                    <Icon.X className="fs-1 sms-burger-icon__expanded"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNonAuthToggler">
                    <ul className="navbar-nav">
                        <NavigationNonAuth/>
                    </ul>
                </div>
        </nav>
    </header>
);

const NavigationAuth = ({authUser}) => (
 <>
        <NavLinkComponentWithIcon link={ROUTES.DASHBOARD} text={"Dashboard"} isExact={true} icon={<Icon.Tools className="fs-5 me-1"/>}/>
        <NavLinkComponentWithIcon link={ROUTES.SETTINGS} text={" Settings"} icon={<Icon.Gear className="fs-5 me-1"/>}/>
        {!!authUser.roles[ROLES.ADMIN] && (
            <NavLinkComponentWithIcon link={ROUTES.ADMIN} text={"Admin"} icon={<Icon.Bug className="fs-5 me-1"/>}/>
        )}
        <SignOutButton/>
   </>
);

const NavigationNonAuth = () => (
    <>
        <NavLinkComponent link={ROUTES.START} text={"Start"} isExact={true}/>
        <NavLinkComponent link={ROUTES.CREATE_ACCOUNT} text={"Create account"}/>
    </>
);

const NavLinkComponent = ({link, text, isExact}) => (
    <NavLink className="nav-link" to={link} exact={isExact}>{text}</NavLink>
);

const NavLinkComponentWithIcon = ({link, text, isExact, icon}) => (
    <NavLink className="nav-link" to={link} exact={isExact}>{icon} {text}</NavLink>
);

export default HeaderNavigation;
