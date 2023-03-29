import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callRegisterAPI } from '../../apis/MemberCallAPI'
import RegisterCSS from './Register.module.css';

function Register(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.memberReducer);

    const [userInfo, setUserInfo] = useState({
        userId:'',
        userPassword:'',
        userName:'',
        userEmail:''
    });

    useEffect(()=> {
        if(user.status === 201){
            console.log("가입상태:" + user);
            navigate("/login", {replace:true})
        } // eslint-disable-next-line
    }, [user]);

    const onChangeHandler = (e) =>{
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const onClickRegisterHandler = () =>{
        dispatch(callRegisterAPI({userInfo: userInfo}))
    }

    const onClickBack = () =>{
        navigate("/", {replace: true})
    }

    return(
        <>        
        <img className={RegisterCSS.img} src={process.env.PUBLIC_URL + './logoimg/binoculars.png'} alt="seastoryLogo"/>                  
        <div className={RegisterCSS.registDiv}>
            <div className={RegisterCSS.registline}>
            <h1 className={RegisterCSS.title}>회원가입</h1><br/>
            <div>
            <input  className={RegisterCSS.inputBox} type="text" name='userId' placeholder='아이디' autoComplete='off' onChange={onChangeHandler}/>
            </div>
            <div>
            <input className={RegisterCSS.inputBox} type="password" placeholder='비밀번호' name='userPassword' autoComplete='off' onChange={onChangeHandler}/>
            </div>
            <div>
            <input className={RegisterCSS.inputBox} type="text" name='userName' placeholder='이름' autoComplete='off' onChange={onChangeHandler}/>
            </div>
            <div>
            <input className={RegisterCSS.inputBox} type="text" name='userEmail' placeholder='이메일' autoComplete='off' onChange={onChangeHandler}/>
            </div><br/>
            <div>
            <button className={RegisterCSS.btn} onClick={onClickRegisterHandler}>회원가입</button>&nbsp;&nbsp;
            <button className={RegisterCSS.btn} onClick={onClickBack}>돌아가기</button>
            </div>
            </div>
        </div>
        </>
    )

} export default Register;