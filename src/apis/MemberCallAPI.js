import { POST_LOGIN, POST_REGISTER } from "../modules/MemberModule";


export const callLoginAPI = ({userInfo}) => { //로그인
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/auth/login`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "POST",
            headers: { // eslint-disable-next-line
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Access-Control-Allow-Origin" : "*"
            },
            body: JSON.stringify({
                memberId : userInfo.userId,
                memberPassword : userInfo.userPassword
            })
        })
        .then(response => response.json());

        console.log('loginResult' + result);

        if(result.status === 200){
            window.localStorage.setItem('accessToken', result.data.accessToken);
        } else{
            alert("아이디 또는 비밀번호를 다시 확인해주세요!!")
        }
        dispatch({type: POST_LOGIN, payload: result});
    };
}

export const callLogoutAPI = () => {//로그아웃
    return async(dispatch, getState) =>{
        dispatch({type: POST_LOGIN, payload:''});
        console.log('result: success logout')
    };
}

export const callRegisterAPI = ({userInfo}) => { //등록
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/auth/signup`;

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "*/*"
                // "Access-Controll-Arrow-Origin": "*"
            },
            body: JSON.stringify({
                memberId: userInfo.userId,
                memberName: userInfo.userName,
                memberPassword: userInfo.userPassword,
                memberEmail: userInfo.userEmail
            })
        })
        .then(response => response.json())

        console.log("회원가입결과" + result);

        if(result.status === 201){
            dispatch({type:POST_REGISTER, payload: result})
        }
        
    };    
}

