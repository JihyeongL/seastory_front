import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import Product from "../../components/products/Product";
import {
    callListAboutLicenseAPI
} from '../../apis/ProductCallAPI';

function Licenses(){
    const dispatch = useDispatch();
    const licenseList = useSelector(state => state.productReducer);

    useEffect(
        ()=> {
            dispatch(callListAboutLicenseAPI());
        }, []
    );


    return (
        <div>
            {
                licenseList.length > 0 && licenseList.map((license) => (<Product key = {license.licenseCode} product={license}/>))
            }
        </div>
    )
}export default Licenses;