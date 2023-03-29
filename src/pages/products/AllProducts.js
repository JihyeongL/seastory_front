import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Product from "../../components/products/Product";
import {callProductListAPI} from '../../apis/ProductCallAPI'
import AllProductCSS from './AllProducts.module.css';
function AllProducts(){
    const dispatch = useDispatch();
    // const products = 
    const products = useSelector(state => state.productReducer);
    const productList = products.data;
    const pageInfo = products.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }
    useEffect(
        ()=>{
            dispatch(callProductListAPI({
                currentPage: currentPage
            }));
        }, [currentPage]
    );

    return(
        <>
        <div>
            {
                Array.isArray(productList) && productList.map((product) => (<Product key={product.licenseCode} product={product}/>))
            }
        </div>
        <div >
            {
                Array.isArray(productList) && <button className={AllProductCSS.btn} onClick={()=> setCurrentPage(currentPage -1)} disabled={currentPage === 1}>
                    &lt;
                </button>
            }
            {pageNumber.map((num) => (
                <li style={{listStyle: 'none', display:'inline'}} key={num} onClick={() => setCurrentPage(num)}>
                    <button className={AllProductCSS.btn}
                        style={currentPage === num ? {backgroundColor : 'skyblue'} : null}>
                            {num}
                        </button>
                </li>
            ))}
            {Array.isArray(productList) &&
            <button className={AllProductCSS.btn}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
            >
                &gt;
            </button>
            }   
        </div>
        </>
    );
    
} export default AllProducts;