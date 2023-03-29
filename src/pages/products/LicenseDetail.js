import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import detailcss from './LicenseDetail.module.css'
import { callLicenseDetailApI } from "../../apis/ProductCallAPI";

function LicenseDetail(){
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const license  = useSelector(state => state.productReducer);  

    

    useEffect(
        () => {
            dispatch(callLicenseDetailApI({	// 상품 상세 정보 조회
                licenseCode: params.licenseCode
            }));            
        } // eslint-disable-next-line
        ,[]
    );
    
    return(
            <div>
                <div className={detailcss.detailDiv}>
                    <br/>
                    <img className={detailcss.img}src={ license.licenseImageUrl } alt="이미지확인!" />
                    <div className={detailcss.info}>
                    <h1>{license.licenseName} 자격증 코스</h1><br/>
                    <h2>{license.licensePrice}원</h2><br/>
                    <h4>{license.licenseDescription}</h4>
                    <br/>
                    <button className={detailcss.btn} onClick={() => navigate("/")}>구매하기</button>&nbsp;&nbsp;
                    <button className={detailcss.btn} onClick={() => navigate(-1)}>돌아가기</button>
                    </div>
                </div>
            </div>
    )

}
export default LicenseDetail;