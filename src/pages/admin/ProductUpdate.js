import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { callLicenseDetailAPIForAdmin, 
                callProductUpdateAPI
} from "../../apis/ProductCallAPI";
import updatecss from './Update.module.css';

function ProductUpdate(){
    const dispatch = useDispatch();
    const params = useParams();
    const productDetail = useSelector(state => state.productReducer);
    const lisence = productDetail.data;
    // console.log('이거맞나',productDetail);
    // console.log('여기는?',lisence)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null);
    const [modifyMode, setModifyMode] = useState(false);
    const imageInput = useRef();
    const navigate = useNavigate();

    const [form, setForm] = useState({});

    useEffect(()=> {
        console.log(params.licenseCode)
        dispatch(callLicenseDetailAPIForAdmin({
            licenseCode: params.licenseCode
        }));
    }, [])

    useEffect (()=>{
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const {result} =  e.target;
                if(result){
                    setImageUrl(result);
                    console.log(result)
                }
            }
            fileReader.readAsDataURL(image);
        }
    }, [image]);

    const onChangeImageUpload = (e) =>{
        const image = e.target.files[0];
        setImage(image);
        console.log('이미지?',image)
    }

    const onClickImageUpload = () => {
        if(modifyMode){
            imageInput.current.click();
        }
    }

    const onClickModifyModeHandler = () =>{
        setModifyMode(true);
        setForm({
            licenseCode: lisence.licenseCode,
            licenseName: lisence.licenseName,
            licensePrice: lisence.licensePrice,
            licenseOrderable: lisence.licenseOrderable,
            categoryCode: lisence.categoryCode,
            licenseDescription: lisence.licenseDescription
        });
        console.log(modifyMode);
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    console.log(form)
    const onClickProductUpdateHandler = () => {



        const formData = new FormData();
        formData.append("licenseCode", form.licenseCode);
        formData.append("licenseName", form.licenseName);
        formData.append("licensePrice", form.licensePrice);
        formData.append("licenseOrderable", form.licenseOrderable);
        formData.append("categoryCode", form.categoryCode);
        formData.append("licenseDescription", form.licenseDescription);

        if(image){
            formData.append("licenseImage", image);
        }

        console.log(formData.get("categoryCode"));

        dispatch(callProductUpdateAPI({	// 상품 정보 업데이트
            form: formData,
            licenseCode: params.licenseCode
        }));         
        console.log(form)
        navigate('/product-management', { replace: true});
        // window.location.reload();
    }


    return (
        <div className={updatecss.updateDiv}>
            {productDetail &&
                <div>
                    <div class className={updatecss.leftdiv}>
                        { productDetail && <img className={updatecss.img} 
                            src={ (imageUrl === null) ? lisence.licenseImageUrl : imageUrl } 
                            alt="preview"
                        />}
                        
                        <input                
                            style={ { display: 'none' }}
                            type="file"
                            name='licenseImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }                            
                        />
                   </div>
                <div className={updatecss.right}>
                    <table style={{marginLeft:"15px"}}>
                        <tbody>
                            <tr>
                                <td><label>상품이름</label></td>
                                <td>
                                    <input 
                                        name='licenseName'
                                        placeholder='상품 이름'
                                        className={updatecss.inputInfo}
                                        value={ (!modifyMode ? lisence.licenseName : form.licenseName) || ''}
                                        onChange={ onChangeHandler }
                                        readOnly={ modifyMode ? false : true }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>상품가격</label></td>
                                <td>
                                    <input 
                                        name="licensePrice"
                                        className={updatecss.inputInfo}
                                        placeholder='상품 가격'
                                        value={(!modifyMode ? lisence.licensePrice : form.licensePrice) || 0 }
                                        type='text'                                    
                                        onChange={ onChangeHandler }
                                        readOnly={ modifyMode ? false : true }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>판매여부</label></td>
                                <td style={{float:"left", marginLeft:"10px"}}>
                                    <label>Y<input type="radio" name="licenseOrderable"  onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? lisence.licenseOrderable : form.licenseOrderable) === 'Y' ? true : false } value="Y" /></label> &nbsp;
                                    <label>N<input type="radio" name="licenseOrderable"  onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? lisence.licenseOrderable : form.licenseOrderable) === 'N' ? true : false } value="N" /></label>
                                </td>
                            </tr>    
                            <tr>
                            <td><label for="category">카테고리선택</label></td>
                            <select className={updatecss.inputInfo} name="categoryCode" onChange={onChangeHandler} readOnly={ modifyMode ? false : true } value={ (!modifyMode ? lisence.categoryCode : form.categoryCode)}>
                                {/* <option value="none">====선택===</option> */}
                                <option value="1" selected>자격증</option>
                                <option value="2">슈트</option>
                                <option value="3">마스크</option>
                                <option value="4">호흡기</option>
                                <option value="5">부력조절기(B.C)</option>
                                <option value="6">부츠</option>
                                <option value="7">악세사리</option>
                            </select>                                
                            </tr> 
                            <tr>
                                <td><label>상품 설명</label></td>
                                <td>
                                    <textarea 
                                        className={updatecss.inputInfo}
                                        style={{height:"100px", width:"300px", resize:"none"}}
                                        name='licenseDescription'
                                        onChange={ onChangeHandler }
                                        readOnly={ modifyMode ? false : true }
                                        value={ (!modifyMode ? lisence.licenseDescription : form.licenseDescription) || '' }
                                    ></textarea>
                                </td>
                            </tr> 
                        </tbody>                        
                    </table>
                <div className={updatecss.btnPosition}>    
                <div>
                    {modifyMode &&
                    <button className={updatecss.Btn}
                            
                                onClick={ onClickImageUpload }    
                            >
                                이미지 업로드
                                </button>
                    }&nbsp;&nbsp;
                    {modifyMode &&
                        <button  className={updatecss.Btn}     
                            onClick={ onClickProductUpdateHandler }             
                        >
                            수정 완료
                        </button>
                    }
                </div>&nbsp;&nbsp;
                <div>
                <button  className={updatecss.Btn}      
                        onClick={ () => navigate(-1) }            
                    >
                        돌아가기
                    </button>&nbsp;&nbsp;
                    {!modifyMode &&
                        <button className={updatecss.Btn}      
                            onClick={ onClickModifyModeHandler }             
                        >
                            수정하기
                        </button>
                    }
                </div>
                </div>
            </div>
            </div>
            }

        </div>
    );
}
export default ProductUpdate;