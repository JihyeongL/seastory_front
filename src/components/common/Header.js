import { NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import headerCSS from './Header.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import LoginModal from './LoginModal';
import {callLogoutAPI} from '../../apis/MemberCallAPI'

function Header (){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginModal, setLoginModal] = useState(false)
    const isLogin = window.localStorage.getItem('accessToken'); 
    // const isLogin = false;
    
    const onClickLogoHandler = () => {
        navigate("/", {replace:true})
    }

    const onClickMypage = () => {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(token);
        if(token.exp * 1000 < Date.now()){
            setLoginModal(true)
            return;
        }
        navigate("/mypage", {replace: true});
    }

    const onClickLogout = () => {
        window.localStorage.removeItem('accessToken');
        dispatch(callLogoutAPI());
        alert('메인화면으로 돌아갑니다.')
        navigate("/",  {replace:true});
        window.location.reload();
    }

    function BeforeLogin(){
        return(
            <div>
                <NavLink to = "/login" className={headerCSS.Navbar}>로그인</NavLink>
                <NavLink to="/register" className={headerCSS.Navbar}>회원가입</NavLink>
            </div>
             // eslint-disable-next-line
        )
    }

    function BeingLogin(){
        return(
            <div>
                 <button onClick={onClickLogout} className={headerCSS.headerbtn}>로그아웃</button>
                 <button onClick={onClickMypage} className={headerCSS.headerbtn}>마이페이지</button>
            </div>
        )
    }

    return(
        <div className={headerCSS.HeaderDiv}>
        {loginModal? <LoginModal setLoginModal = {setLoginModal}/> : null}
            <div className={headerCSS.headerMenu}>
                <div>
                <img className={headerCSS.imgStyle} src={process.env.PUBLIC_URL + './logoimg/scuba.png'} alt="seastoryLogo"/>
                    <button className={headerCSS.LogoBtn} onClick={onClickLogoHandler}>바다이야기</button>
                </div>
                <div className={headerCSS.headerbtndiv}>
                    {(isLogin == null || isLogin === undefined)? <BeforeLogin/> : <BeingLogin/>}
                </div>
            </div>
        </div>
    );
}
export default Header;