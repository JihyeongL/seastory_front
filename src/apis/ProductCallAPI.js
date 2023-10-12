import {
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCTS_LICENSES,// eslint-disable-next-line
    POST_PRODUCT,
    PUT_PRODUCT,
    DELETE_PRODUCT
} from '../modules/ProductModule.js'

export const callProductListAPI=({currentPage})=>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/api/v1/licenses?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/api/v1/licenses`;
    }

    console.log('리스트목록');

    return async(dispatch, getstate) => {
        const result = await fetch(requestURL, {
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*" 
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(result);
            dispatch({type: GET_PRODUCTS, payload: result.data});
        }
    };
}

export const callListAboutLicenseAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/api/v1/products/licenses`;

    console.log(requestURL);

    return async (dispatch, getstate) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(result)
            dispatch({type: GET_PRODUCTS_LICENSES, payload: result.data})
        }
    };
}

export const callLicenseDetailApI = ({licenseCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/api/v1/licenses/${licenseCode}`;

    console.log(requestURL);

    return async (dispatch, getstate) => {
        console.log("비동기 요청")
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());
        console.log("비동기 처리" + result);

        if(result.status === 200){
            console.log("비동기 처리 완료")
            dispatch({type: GET_PRODUCT, payload: result.data})
        }
    };
} 

export const callProductListForAdminAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/api/v1/licenses-management?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/api/v1/licenses-management`;
    }
    
    console.log('[ProduceAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(result);
            dispatch({ type: GET_PRODUCTS,  payload: result.data });
        }
        console.log("비동기 처리 완료")
        
    };
}
export const callProductRegistAPI = ({productInfo}) => {
    console.log("상품 등록 api")
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/api/v1/licenses-management`;
    console.log(requestURL);
    return async (dispatch, getState) => {
        console.log("비동기 시작")
        const result = await fetch(requestURL,{
            method:"POST",
            headers:{
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: productInfo
        })
        .then(response => response.json());
        console.log("비동기 처리 중");

        dispatch({type:POST_PRODUCT, payload: result});
        
        console.log("비동기처리완료")
    };
}
export const callLicenseDetailAPIForAdmin = ({licenseCode}) => {
    console.log("관리자 상품조회api");

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/api/v1/licenses-management/${licenseCode}`;
    console.log(requestURL);
    return async(dispatch, getState) => {
        console.log("관리자 상품조회 비동기 시작")
        const result = await fetch(requestURL,{
            method : "Get",
            headers : {"Content-Type": "application/json",
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log("비동기처리 완료!!!")
            dispatch({type: GET_PRODUCT, payload: result})
        }else{
            alert("조회실패ㅠㅠ")
        }
    };
}
export const callProductUpdateAPI = ({form, licenseCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/api/v1/licenses-management/${licenseCode}`;
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[ProduceAPICalls] callProductUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_PRODUCT,  payload: result });
        
    };    
}
export const callProductDelete = ({licenseCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8999/api/v1/licenses-management/${licenseCode}`;
    console.log("deleteapt 작동~~~~~~~~")
    return async (dispatch, getState) => {
        const result = await fetch(requestURL,{
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(reponse => reponse.json());
        console.log("deleteapi 작동중~~~~~~~~")
        dispatch({type: DELETE_PRODUCT, payload: result});
        console.log("삭제 비동기처리 완료")
    };
    
}
