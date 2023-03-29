import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { callLoginAPI } from '../../apis/MemberCallAPI';
import LoginCSS from './Login.module.css';

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);

    const [userInfo, setUserInfo] = useState({
        userId:'',
        userPassword:''
    });

    useEffect(()=>{
        if(loginMember.status === 200){
            console.log(loginMember);
            navigate("/", {replace:true});
            window.location.reload();
        }
    },[loginMember, navigate]);

    const onChangeHandler = (e) =>{
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
    }

    const onClickLoginHandler = () => {
        dispatch(callLoginAPI({userInfo: userInfo}))
    }

    const onClickRegisterHandler = () => {
        navigate("/register", {replace: true})
    }

    return(
        <>
        <img className={LoginCSS.img} src={process.env.PUBLIC_URL + './logoimg/binoculars.png'} alt="seastoryLogo"/>                  
        <div className={LoginCSS.loginDiv}>
            <div className={LoginCSS.loginline}>
            <div>
            <h1 className={LoginCSS.title}>로그인</h1><br/><br/>
            <input type="text" className={LoginCSS.inputBox} name='userId' placeholder="아이디" autoComplete="off" onChange={onChangeHandler} required/><br/><br/>
            <input type="password" className={LoginCSS.inputBox} name="userPassword" placeholder="패스워드" autoComplete="off" onChange={onChangeHandler} required/>
            </div><br/><br/>
            <div>
            <button className={LoginCSS.btn} onClick={onClickLoginHandler}>로그인</button>&nbsp;&nbsp;
            <button className={LoginCSS.btn} onClick={onClickRegisterHandler}>회원가입</button>&nbsp;&nbsp;
            <button className={LoginCSS.btn} onClick={() => {navigate(-1)}}>돌아가기</button>
            </div>
            </div>
        </div>
     </>
    )




}export default Login;