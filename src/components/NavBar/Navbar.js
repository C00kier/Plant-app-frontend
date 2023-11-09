import "./Navbar.css";
import PAGES from '../../constants/pages';
import logo from '../../../src/assets/logo/sprout_logo.png'
import user_icon from '../../../src/assets/user/user-circle.256x256.png';

import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar(props) {
    const { setProfileDetails, setIsUserLogedIn, isUserLogedIn } = props;
    const [isSignOut, setIsSignOut] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSignOut = () => {
        setProfileDetails({});
        setIsUserLogedIn(false);
        //setIsSignOut(true);
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <div className='navbar-div'>
                <div className="navbar-logo">
                    <Link to={PAGES.HOME}><img className="navbar-logo-image" src={logo} alt="logo" /></Link>
                </div>
                <div className="navbar-links-container">
                    <ul className="navbar-links-container">
                        <Link to={PAGES.ABOUT}><li className="ok">O nas</li></Link>
                        <li><Link to={PAGES.SEARCH}>Szukaj roślin</Link></li>
                        <li className="navbar-button-login"><Link to={PAGES.LOGIN}>Zaloguj</Link></li>
                    </ul>
                </div>
                <div className="user-icon" onClick={toggleDropdown}>
                    <img className="user-icon-image" src={user_icon} />
                    {dropdownOpen && (
                        <div className="navbar-dropdown-container">
                            <ul className="navbar-dropdown-links">
                                <li><Link to={PAGES.HOME}>Profil</Link></li>
                                <li><Link to={PAGES.BLOG}>Blog</Link></li>
                                <li><Link to={PAGES.FORUM}>Forum</Link></li>
                                <li><Link to={PAGES.LOGIN}>Profil</Link></li>
                                {/* <li><Link to="/logout">Wyloguj</Link></li> */}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}