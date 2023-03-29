import {useState} from "react"
import { useDispatch } from "react-redux"
import {callLoginAPI} from '../../apis/MemberCallAPI';


function LoginModal({setLoginModal}){
    const dispatch = useDispatch();
    const accessToken = window.localStorage.getItem('accessToken');
    const [userInfo, setUserInfo] = useState({
        userId: '',
        userPassword:''
    });
    
    const onChangeHandler = (e) =>{
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
    }

    const onClickLoginHandler = () => {
        if(accessToken !== null){
            window.localStorage.removeItem('accessToken')
        }
        dispatch(callLoginAPI({
            userInfo: userInfo
        }));

        setLoginModal(false);
        console.log(setLoginModal);
        alert('로그인이 완료되었습니다.')
        window.location.reload();
    }

    return(
        <div>
            <h1>로그인</h1>
            <input text='text'name='userId' placeholder="아이디" autoComplete="off" onChange={onChangeHandler}/>
            <input text='password' name="userPassword" placeholder="패스워드" autoComplete="off" onChange={onChangeHandler}/>
            <button onClick={onClickLoginHandler}>로그인</button>
            <button onClick={()=> setLoginModal(false)}>돌아가기</button>
        </div>
    )
} export default LoginModal;