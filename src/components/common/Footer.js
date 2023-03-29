import FooterCSS from './Footer.module.css';
import { NavLink } from 'react-router-dom';




function Footer() {

    return (
        <div className={ FooterCSS.footerDiv }>
            <ul className={FooterCSS.footerMenu}>
                <li>
                    <NavLink to ="/" className={FooterCSS.navLink}>Home</NavLink>
                    <NavLink to ="/" className={FooterCSS.navLink}>About</NavLink>
                    <NavLink to ="/" className={FooterCSS.navLink}>Contact</NavLink>
                </li>
            </ul>
            <h5 className={FooterCSS.h5}>Copyright 2022. SeaStroy All rights reserved.</h5>
        </div>
    );
}

export default Footer;
