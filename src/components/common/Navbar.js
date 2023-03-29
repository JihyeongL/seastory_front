import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import navcss from './Navbar.module.css'



function Navbar (){

    const isLogin = window.localStorage.getItem('accessToken')
    let decoded = null;

    if(isLogin !== undefined && isLogin !==null){
        const temp = decodeJwt(window.localStorage.getItem('accessToken'));
        decoded = temp.auth[0];
    }
    
    console.log('decoded' + decoded);

    return(
        <div className={navcss.navbarDiv}>
            <ul className={navcss.navMenu}>
                <li>
                <NavLink to="/allproducts" className={navcss.navbar}>전체</NavLink>
                <NavLink to="/" className={navcss.navbar}>슈트</NavLink>
                <NavLink to="/" className={navcss.navbar}>마스크</NavLink>
                <NavLink to="/" className={navcss.navbar}>호흡기</NavLink>
                <NavLink to="/" className={navcss.navbar}>B.C(부력조절기)</NavLink>
                <NavLink to="/" className={navcss.navbar}>부츠</NavLink>
                <NavLink to="/" className={navcss.navbar}>악세사리</NavLink>
                <NavLink to="/licenses" className={navcss.navbar}>자격증</NavLink>
                {decoded === "ROLE_ADMIN" && <NavLink to="/product-management" className={navcss.navbar}>상품관리</NavLink>}
                </li>
            </ul>
        </div>
    );
}export default Navbar;