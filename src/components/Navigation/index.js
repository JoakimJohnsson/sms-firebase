import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {AuthUserContext} from '../Session';
import SmsLogo from "../Logo";
import * as Icon from 'react-bootstrap-icons';
import {Nav, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import i18n from "../../i18n";
import {useTranslation} from "react-i18next";
import SignInForm from "../SignIn";

const HeaderNavigation = () => {

    // Scroll listener hook to check if we're on top
    const [onTop, setOnTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 0 && onTop) {
                setOnTop(false);
            }
            if (currentScrollY === 0 && !onTop) {
                setOnTop(true);
            }
        };
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, [onTop]);

    return (
        <AuthUserContext.Consumer>
            {authUser => authUser ? <HeaderAuth authUser={authUser} onTop={onTop}/> : <HeaderNonAuth onTop={onTop}/>}
        </AuthUserContext.Consumer>
    )
};

const HeaderAuth = ({authUser, onTop}) => {

    const {t} = useTranslation();
    const [expanded, setExpanded] = useState(false);
    const initials = authUser.firstname ? authUser.firstname.charAt(0).toUpperCase() + authUser.lastname.charAt(0).toUpperCase() : false;
    const name = authUser.firstname ? authUser.firstname + " " + authUser.lastname : false;
    let navbarClass = onTop ? "fixed-top border-bottom" : "fixed-top border-bottom box-shadow";

    return (
        <header className="container-fluid bg-light px-3">
            <Navbar bg="light" variant="light" expand="lg" className={navbarClass} expanded={expanded}>
                <Navbar.Brand>
                    <SmsLogo isLoggedIn={true}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarAuthToggler" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                <Navbar.Collapse id="navbarAuthToggler">
                    <Nav className="mr-auto">
                        {initials && (
                            <>
                                <p className="d-none d-lg-flex fs-3 border-end align-items-center m-0 pe-3 me-2">{initials}</p>
                                <p className="d-block d-lg-none pb-3 border-bottom">{t('navigation_logged_in_as')} {name}</p>
                            </>
                        )}

                        <NavLinkComponentWithIcon link={ROUTES.DASHBOARD} text={t('navigation_dashboard')} isExact={true}
                                                  icon={<Icon.Tools className="fs-5 me-1"/>} setExpanded={setExpanded}/>
                        <NavLinkComponentWithIcon link={ROUTES.SETTINGS} text={t('navigation_settings')} icon={<Icon.Gear className="fs-5 me-1"/>}
                                                  setExpanded={setExpanded}/>
                        {!!authUser.roles[ROLES.ADMIN] && (

                            <NavLink className="nav-link" to={ROUTES.ADMIN}
                                     exact={true} onClick={() => setExpanded(false)}>
                                <Icon.Bug className="fs-5 me-1"/>
                                <span className="d-lg-none d-xl-inline">{t('navigation_administration')}</span>
                            </NavLink>
                        )}
                        <div><ChangeLanguageButton t={t}/></div>
                        <div><SignOutButton/></div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
};

const HeaderNonAuth = ({onTop}) => {

    const {t} = useTranslation();
    const [expanded, setExpanded] = useState(false);
    let navbarClass = onTop ? "fixed-top border-bottom" : "fixed-top border-bottom box-shadow";

    return (
        <header className="container-fluid bg-light px-3">
            <Navbar bg="light" expand="lg" className={navbarClass} expanded={expanded}>
                <Navbar.Brand><SmsLogo isLoggedIn={false}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNonAuthToggler" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                <Navbar.Collapse id="navbarNonAuthToggler">
                    <Nav className="mr-auto">
                        <NavLinkComponent link={ROUTES.HOME} text={t('navigation_home')} isExact={true} setExpanded={setExpanded}/>
                        <NavLinkComponent link={ROUTES.CREATE_ACCOUNT} text={t('navigation_create_account')} setExpanded={setExpanded}/>
                        <NavLinkComponent link={ROUTES.PASSWORD_FORGET} text={t('navigation_password_forget')} setExpanded={setExpanded}/>
                        <div><ChangeLanguageButton t={t}/></div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
};

const changeLanguage = () => {
    return () => {
        if (i18n.language === "en") {
            i18n.changeLanguage("sv");
        } else {
            i18n.changeLanguage("en");
        }
    }
}

const ChangeLanguageButton = ({t}) => (

    <OverlayTrigger
        key={"bottom"}
        placement={"bottom"}
        overlay={
            <Tooltip id={"tooltip-change-lang"} className="d-none d-lg-block">
                {t('tooltip_change_language')}
            </Tooltip>
        }>
        <button aria-label={t('btn_change_language')}
                className="btn btn-secondary btn__neu ms-lg-3 d-flex align-items-center justify-content-center"
                title={t('btn_change_language')}
                onClick={changeLanguage()}>
            <Icon.Globe2 className="fs-4 me-2 me-lg-0"/>
            <span className="d-inline d-lg-none">{t('btn_change_language')}</span>
        </button>
    </OverlayTrigger>


);

const NavLinkComponent = ({link, text, isExact, setExpanded}) => (
    <NavLink className="nav-link" to={link} exact={isExact} onClick={() => setExpanded(false)}>{text}</NavLink>
);
const NavLinkComponentWithIcon = ({link, text, isExact, icon, setExpanded}) => (
    <NavLink className="nav-link" to={link} exact={isExact} onClick={() => setExpanded(false)}>{icon} {text}</NavLink>
);

export default HeaderNavigation;
