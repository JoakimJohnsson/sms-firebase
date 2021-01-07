import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {AuthUserContext} from '../Session';
import SmsLogo from "../Logo";
import * as Icon from 'react-bootstrap-icons';
import {Nav, Navbar} from "react-bootstrap";
import i18n from "../../i18n";
import {useTranslation} from "react-i18next";

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

const HeaderAuth = ({authUser}) => {

    const {t} = useTranslation();
    const [expanded, setExpanded] = useState(false);

    return (
        <header className="container-fluid bg-dark px-3">
            <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top border-bottom" expanded={expanded}>
                <Navbar.Brand><SmsLogo isLoggedIn={true}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarAuthToggler" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                <Navbar.Collapse id="navbarAuthToggler">
                    <Nav className="mr-auto">
                        <NavLinkComponentWithIcon link={ROUTES.DASHBOARD} text={"Dashboard"} isExact={true}
                                                  icon={<Icon.Tools className="fs-5 me-1"/>} setExpanded={setExpanded}/>
                        <NavLinkComponentWithIcon link={ROUTES.SETTINGS} text={" Settings"} icon={<Icon.Gear className="fs-5 me-1"/>}
                                                  setExpanded={setExpanded}/>
                        {!!authUser.roles[ROLES.ADMIN] && (
                            <NavLinkComponentWithIcon link={ROUTES.ADMIN} text={"Administration"} icon={<Icon.Bug className="fs-5 me-1"/>}
                                                      setExpanded={setExpanded}/>
                        )}
                        <ChangeLanguageButton t={t}/>
                        <SignOutButton/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
};

const HeaderNonAuth = ({onTop}) => {

    const {t} = useTranslation();
    const [expanded, setExpanded] = useState(false);
    let navbarClass = onTop ? "fixed-top" : "fixed-top border-bottom";

    return (
        <header className="container-fluid bg-light px-3">
            <Navbar bg="light" expand="lg" className={navbarClass} expanded={expanded}>
                <Navbar.Brand><SmsLogo isLoggedIn={false}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNonAuthToggler" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                <Navbar.Collapse id="navbarNonAuthToggler">
                    <Nav className="mr-auto">
                        <NavLinkComponent link={ROUTES.HOME} text={t('navigation_home')} isExact={true} setExpanded={setExpanded}/>
                        <NavLinkComponent link={ROUTES.CREATE_ACCOUNT} text={t('navigation_create_account')} setExpanded={setExpanded}/>
                        <ChangeLanguageButton t={t}/>
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
    <button aria-label={t('btn_txt_change_language')}
            className="btn btn-secondary ms-lg-3 d-flex align-items-center justify-content-center"
            title={t('btn_txt_change_language')}
            onClick={changeLanguage()}>
        <Icon.Globe2 className="fs-4 me-2 me-lg-0 me-xl-2"/>
        <span className="d-inline d-lg-none">{t('btn_txt_change_language')}</span>
        <span className="d-none d-xl-inline">{t('btn_txt_change_language_short')}</span>
    </button>
);

const NavLinkComponent = ({link, text, isExact, setExpanded}) => (
    <NavLink className="nav-link" to={link} exact={isExact} onClick={() => setExpanded(false)}>{text}</NavLink>
);
const NavLinkComponentWithIcon = ({link, text, isExact, icon, setExpanded}) => (
    <NavLink className="nav-link" to={link} exact={isExact} onClick={() => setExpanded(false)}>{icon} {text}</NavLink>
);

export default HeaderNavigation;
