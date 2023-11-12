import "./Footer.css";

import PAGES from '../../constants/pages';
import logo from '../../../src/assets/logo/sprout_writing.png'
import facebook_logo from '../../../src/assets/social/facebook.256x256.png'
import instagram_logo from '../../../src/assets/social/instagram.256x256.png'

import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <div className="footer-div-flex-row-space-evenly">
                <div className="footer-logo">
                    <Link to={PAGES.HOME}><img className="footer-logo-image" src={logo} alt="logo"/></Link>
                </div>
                <div className="footer-links-container">
                    <ul className="footer-links">
                    <li><Link to={PAGES.ABOUT}>O nas</Link></li>
                    <li><Link to={PAGES.CONTACT}>Kontakt</Link></li>
                    <li><Link to={PAGES.PRIVACY_POLICY}>Polityka Prywatności</Link></li>
                    <li><Link to={PAGES.TERMS}>Regulamin</Link></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <Link to="https://www.facebook.com/"><img className="footer-facebook" src={facebook_logo} alt="facebook_logo"/></Link>
                    <Link to="https://www.instagram.com/"><img className="footer-instagram" src={instagram_logo} alt="instagram_logo"/></Link>
                </div>
            </div>
        </>
    )
}