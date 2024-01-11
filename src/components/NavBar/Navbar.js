import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import "./Navbar.css";
import PAGES from '../../constants/pages';
import logo from '../../../src/assets/logo/sprout_logo.png'
import userIconImage from '../../../src/assets/user/user-circle.256x256.png';
import hamburger from '../../assets/accountSidebar/hamburger_icon.png'

//constants
import COMPONENT_STATE from "../../constants/myAccountComponentStates.js";

//contexts
import { functionalityElementContext } from '../../App.js';


export default function Navbar(props) {
    const { cookies, removeCookie } = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [myAccountDropdownOpen, setMyAccountDropDownOpen] = useState(false);
    const navigate = useNavigate();
    const {functionalityElement, setFunctionalityElement} = useContext(functionalityElementContext);

    const handleSignOut = () => {
        removeCookie("token");
        removeCookie("userId");
        navigate(PAGES.HOME);
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMyAccountDropdown = () => {
        setMyAccountDropDownOpen(!myAccountDropdownOpen);
    }

    const commonLinks = (
        <div className="navbar-links-container">
            <ul>
                {cookies.token ? (<li></li>) : (<li className='navbar-dropdown-links-bold'><Link to={PAGES.LOGIN}>Zaloguj się</Link></li>)}
                <li><Link to={PAGES.SEARCH}>Szukaj roślin</Link></li>
                <li><Link to={PAGES.BLOG}>Blog</Link></li>
            </ul>
        </div>
    );

    const userIcon = (
        <div className="user-icon" onClick={toggleDropdown}>
            <img className="user-icon-image" src={userIconImage} alt="user-icon" />
            {dropdownOpen && (
                <div className="navbar-dropdown-container">
                    <ul className="navbar-dropdown-links">
                        <li className="navbar-dropdown-links-my-account"><Link to={PAGES.HOME}>Moje konto</Link></li>
                        <li className="navbar-desktop-hidden"><Link to={PAGES.SEARCH}>Dodaj roślinę</Link></li>
                        <li><Link to={PAGES.BLOG}>Blog</Link></li>
                        <li><Link to={PAGES.SEARCH}>Szukaj roślin</Link></li>
                        <li><Link to={PAGES.ABOUT}>O nas</Link></li>
                        <li><Link to={PAGES.CONTACT}>Kontakt</Link></li>
                        <li onClick={handleSignOut}>Wyloguj</li>
                    </ul>
                </div>
            )}
        </div>
    );

    const myAccountIcon = (
        <div className="my-account-icon" onClick={toggleMyAccountDropdown}>
            <img className="my-account-icon-image" src={hamburger} alt="hamburger-icon" />
            {myAccountDropdownOpen && (
                <div className="navbar-dropdown-container">
                    <ul className="myAccount-dropdown-links">
                        <li onClick={() => setFunctionalityElement(COMPONENT_STATE.COCKPIT)}>Kokpit</li>
                        <li onClick={() => setFunctionalityElement(COMPONENT_STATE.RECOMMENDATION)}>Rekomendacje</li>
                        <li onClick={() => setFunctionalityElement(COMPONENT_STATE.MY_PLANTS)}>Moje rośliny</li>
                        <li onClick={() => setFunctionalityElement(COMPONENT_STATE.BADGES)}>Odznaki</li>
                        <li onClick={() => setFunctionalityElement(COMPONENT_STATE.SETTINGS)}>Ustawienia</li>
                    </ul>
                </div>
            )}
        </div>
    );

    return (
        <div className='navbar-div'>
            <div className="navbar-logo">
                <Link to={PAGES.HOME}><img className="navbar-logo-image" src={logo} alt="logo" /></Link>
            </div>
            {cookies.token ? (
                <>
                    {commonLinks}
                    <div className='navbar-icons'>
                        {userIcon}
                        {myAccountIcon}
                    </div>
                </>
            ) : (
                <>
                    {commonLinks}
                    <div className="user-icon" onClick={toggleDropdown}>
                        <img className="user-icon-image" src={userIconImage} alt="user-icon" />
                        {dropdownOpen && (
                            <div className="navbar-dropdown-container">
                                <ul className="navbar-dropdown-links">
                                    <li className="navbar-dropdown-links-bold">
                                        <Link to={PAGES.REGISTER}>Zarejestruj się</Link></li>
                                    <li><Link to={PAGES.LOGIN}>Zaloguj się</Link></li>
                                    <li><Link to={PAGES.BLOG}>Blog</Link></li>
                                    <li><Link to={PAGES.SEARCH}>Szukaj roślin</Link></li>
                                    <li><Link to={PAGES.ABOUT}>O nas</Link></li>
                                    <li><Link to={PAGES.CONTACT}>Kontakt</Link></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}