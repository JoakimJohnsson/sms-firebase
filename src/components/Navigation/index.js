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
    let navbarClass = onTop ? "fixed-top border-bottom p-0" : "fixed-top border-bottom navbar__on-scroll-down p-0";

    return (
        <header className="container-fluid bg-light px-3">
            <Navbar variant="light" expand="lg" className={navbarClass} expanded={expanded}>
                <Navbar.Brand className={"p-3"}>
                    <SmsLogo isLoggedIn={true}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarAuthToggler" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                <Navbar.Collapse id="navbarAuthToggler" className={"p-3 border-top border-lg-none"}>
                    <Nav className="mr-auto">
                        {initials && (
                            <>
                                <p className="d-none d-lg-flex fs-3 border-end align-items-center m-0 pe-3 me-2">{initials}</p>
                                <p className="d-block d-lg-none pb-3 border-bottom">{t('navigation_logged_in_as')} {name}</p>
                            </>
                        )}

                        <OverlayTrigger
                            key={"bottom"}
                            placement={"bottom"}
                            overlay={
                                <Tooltip id={"tooltip-dashboard"} className="d-none d-lg-block d-xl-none">
                                    {t('navigation_dashboard')}
                                </Tooltip>
                            }>
                            <NavLink className="nav-link" to={ROUTES.DASHBOARD}
                                     exact={true} onClick={() => setExpanded(false)}>
                                <Icon.Tools className="fs-5 me-1"/>
                                <span className="d-lg-none d-xl-inline">{t('navigation_dashboard')}</span>
                            </NavLink>
                        </OverlayTrigger>

                        <OverlayTrigger
                            key={"bottom"}
                            placement={"bottom"}
                            overlay={
                                <Tooltip id={"tooltip-settings"} className="d-none d-lg-block d-xl-none">
                                    {t('navigation_settings')}
                                </Tooltip>
                            }>
                            <NavLink className="nav-link" to={ROUTES.SETTINGS}
                                     exact={true} onClick={() => setExpanded(false)}>
                                <Icon.Gear className="fs-5 me-1"/>
                                <span className="d-lg-none d-xl-inline">{t('navigation_settings')}</span>
                            </NavLink>
                        </OverlayTrigger>

                        {!!authUser.roles[ROLES.ADMIN] && (
                            <OverlayTrigger
                                key={"bottom"}
                                placement={"bottom"}
                                overlay={
                                    <Tooltip id={"tooltip-administration"} className="d-none d-lg-block d-xl-none">
                                        {t('navigation_administration')}
                                    </Tooltip>
                                }>
                                <NavLink className="nav-link" to={ROUTES.ADMIN}
                                         exact={true} onClick={() => setExpanded(false)}>
                                    <Icon.Bug className="fs-5 me-1"/>
                                    <span className="d-lg-none d-xl-inline">{t('navigation_administration')}</span>
                                </NavLink>
                            </OverlayTrigger>
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
    let navbarClass = onTop ? "fixed-top border-bottom p-0" : "fixed-top border-bottom navbar__on-scroll-down p-0";

    return (
        <header className="container-fluid bg-light px-3">
            <Navbar expand="lg" className={navbarClass} expanded={expanded}>
                <Navbar.Brand className={"p-2 p-lg-3"}>
                    <SmsLogo isLoggedIn={false}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNonAuthToggler" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                <Navbar.Collapse id="navbarNonAuthToggler" className={"p-3 border-top border-lg-none"}>
                    <Nav className="mr-auto">
                        <NavLinkComponentWithIcon link={ROUTES.HOME} text={t('navigation_home')} isExact={true} setExpanded={setExpanded}
                                                  icon={<Icon.HouseDoor className="fs-5 me-1"/>}/>
                        <NavLinkComponentWithIcon link={ROUTES.CREATE_ACCOUNT} text={t('navigation_create_account')} setExpanded={setExpanded}
                                                  icon={<Icon.HandThumbsUp className="fs-5 me-1"/>}/>
                        <NavLinkComponentWithIcon link={ROUTES.PASSWORD_FORGET} text={t('navigation_password_forget')} setExpanded={setExpanded}
                                                  icon={<Icon.QuestionDiamond className="fs-5 me-1"/>}/>
                        <div><ChangeLanguageButton t={t}/></div>
                    </Nav>
                    <div className="d-lg-none">
                        <p className="form-header"><Icon.DoorOpen className="fs-5 me-1"/> {t('home_modal_header_sign_in')}</p>
                        <SignInForm/>
                    </div>
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
                className="btn btn-secondary ms-lg-3 d-flex align-items-center justify-content-center"
                title={t('btn_change_language')}
                onClick={changeLanguage()}>
            <Icon.Globe2 className="fs-4 me-2 me-lg-0"/>
            <span className="d-inline d-lg-none">{t('btn_change_language')}</span>
        </button>
    </OverlayTrigger>


);

const NavLinkComponentWithIcon = ({link, text, isExact, icon, setExpanded}) => (
    <NavLink className="nav-link" to={link} exact={isExact} onClick={() => setExpanded(false)}>{icon} <span
        className="d-lg-none d-xl-inline">{text}</span></NavLink>
);

export default HeaderNavigation;
