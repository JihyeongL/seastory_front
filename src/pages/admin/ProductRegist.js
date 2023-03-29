import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import {callProductRegistAPI} from "../../apis/ProductCallAPI";
import registcss from './Regist.module.css'

function ProductRegist(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();

    const [productInfo, setProductInfo] = useState({
        licenseName: '',
        licensePrice: 0,
        licenseOrderable: '',
        categoryCode: 0,
        licenseDescription: ''
    });

    useEffect(()=>{
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const {result} = e.target;
                if(result) {
                    setImageUrl(result)
                }
            }
            fileReader.readAsDataURL(image);
        }
    },[image]);

    const onChangeImageUpload = (e) => {
        const image = e.target.files[0];
        setImage(image);
    }

    const onClickImgUpload = () => {
        imageInput.current.click();
    }

   


    const onChangeHandler = (e) => {
        setProductInfo({
            ...productInfo,
                [e.target.name]: e.target.value
        });
    }

    const onClickResigtProduct = () => {

        console.log("상품등록 버튼")

        const formData = new FormData();

        formData.append("licenseName", productInfo.licenseName);
        formData.append("licensePrice", productInfo.licensePrice);
        formData.append("licenseOrderable", productInfo.licenseOrderable);
        formData.append("categoryCode", productInfo.categoryCode);
        formData.append("licenseDescription", productInfo.licenseDescription);
        
        if(image){
            formData.append("licenseImage", image);
        }


        console.log(formData.get("licenseName"));
        console.log(formData.get("licensePrice"));
        console.log(formData.get("licenseOrderable"));
        console.log(formData.get("categoryCode"));
        console.log(formData.get("licenseDescription"));
        console.log(formData.get("licenseImageUrl"));

        dispatch(callProductRegistAPI({
            productInfo: formData
        }));

        alert("상품등록완료!!")
        navigate("/product-management", {replace: false});
    }


    return (
        <div className={registcss.registDiv}>
            <div className={registcss.imgDiv}>
            {imageUrl && <img width="350px"src={imageUrl} alt="등록사진"/>}
                <input style={ { display: 'none' }} type="file" name="licenseImage" accept='image/jpg,image/png,image/jpeg,image/gif'
                 onChange={onChangeImageUpload} ref={imageInput}/>
            </div>
            <div className={registcss.prodInfo}>
                <div>
                <table>
                    <tbody>
                        <tr>
                            <td><label>상품이름</label></td>
                            <td>
                                <input
                                    className={registcss.inputBox}
                                    name="licenseName"
                                    placeholder="상품 이름"
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>상품 가격</label></td>
                            <input
                                className={registcss.inputBox}
                                name="licensePrice"
                                placeholder="상품 가격"
                                onChange={onChangeHandler}
                            />
                        </tr>
                        <tr>
                            <td><label>판매여부</label></td>
                            <td className={registcss.inputBox}>
                                <label><input type={"radio"} name="licenseOrderable" onChange={onChangeHandler} value="Y"/>Y </label>
                                <label><input type={"radio"} name="licenseOrderable" onChange={onChangeHandler} value="N"/>N </label>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="category">카테고리선택</label></td>
                            <select name="categoryCode" className={registcss.inputBox} onChange={onChangeHandler}>
                            <option value="none" selected>====선택====</option>
                                <option value="1">자격증</option>
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
                                <textarea name="licenseDescription" placeholder="상품설명" className={registcss.textBox} onChange={onChangeHandler}>
                                </textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                    <div style={{marginLeft:"10px", marginTop:"10px"}}>
                    
                        <button className={registcss.Btn} onClick={onClickImgUpload}>
                            사진 등록
                        </button>&nbsp;&nbsp;
                    
                        <button className={registcss.Btn} onClick={onClickResigtProduct}>
                            상품 등록
                        </button>&nbsp;&nbsp;
                    
                        <button className={registcss.Btn} onClick={() => navigate(-1)}>
                            돌아가기
                        </button>
                        
                    </div>
                    </div>
            </div>
        </div>
    )

}
export default ProductRegist;