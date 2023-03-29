import { useNavigate } from 'react-router-dom';
import ProductCSS from './Product.module.css';


function Product({ product : {licenseCode, licenseImageUrl, licenseName, licensePrice}}) {

    const navigate = useNavigate();

    const onClickProductHandler = (licenseCode) => {
        navigate(`/product/${licenseCode}`, { replace: false });
    }

    return (
        <div className={ProductCSS.list}
            onClick={ () => onClickProductHandler(licenseCode) }
        >
            <br/>
            <img className={ProductCSS.img} src={ licenseImageUrl } alt="이미지확인!" />
            <h4 className={ProductCSS.tagH5}>{ licenseName } 자격증 코스</h4>
            <h4 className={ProductCSS.tagH5}>{ licensePrice }원</h4>
            <br></br>
        </div>
        
    );
}

export default Product;