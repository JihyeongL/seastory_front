import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import productcss from './Product.module.css';
import {callProductListForAdminAPI, callProductDelete} from "../../apis/ProductCallAPI";

function ProductManagement(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer);
    const productList = products.data;
    console.log(productList);

    const pageInfo = products.pageInfo;
    console.log(products)

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i =1; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }

    useEffect(()=>{
        dispatch(callProductListForAdminAPI({
            currentPage : currentPage
        }));
    },[currentPage]
    );

    const onClickProductRegister = () => {
        console.log("상품등록으로 이동")
        navigate("/product-regist", {replace: false})
    }

    const onClickProductTable = (licenseCode) => {
        navigate(`/product-update/${licenseCode}`, {replace: false});
    }

    const deleteHandler = (licenseCode) => {
        console.log("삭제버튼", productList.licenseCode)

        dispatch(callProductDelete({
            licenseCode: licenseCode
        }));

        console.log("삭제처리완료");
        alert("상품삭제완료")
        navigate("/product-management", {replace: true})
        window.location.reload();
    }

    return (
    <div className={productcss.managementDiv}>
        <div>
            <table>
                <colgroup>
                    <col width="50px" />
                    <col width="100px" />
                    <col width="100pcol x" />
                    <col width="100px" />
                    <col width="100px" />
                    <col width="100px" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>카테고리</th>
                        <th>상품이름</th>
                        <th>상품가격</th>
                        <th>주문여부</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(productList) && productList.map((p) =>(
                        <tr key={p.licenseCode}>
                            <td onClick={() => onClickProductTable(p.licenseCode)}>{p.licenseCode}</td>
                            <td onClick={() => onClickProductTable(p.licenseCode)}>{p.categoryName}</td>
                            <td onClick={() => onClickProductTable(p.licenseCode)}>{p.licenseName}</td>
                            <td onClick={() => onClickProductTable(p.licenseCode)}>{p.licensePrice}</td>
                            <td onClick={() => onClickProductTable(p.licenseCode)}>{p.licenseOrderable}</td>
                            <td><button className={productcss.deleteBtn} onClick={() => deleteHandler(p.licenseCode)}>상품삭제</button></td> 
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
        <br/>
        <div style={{flexDirection:"row", marginLeft:"15%"}}>
            {
                Array.isArray(productList) && <button className={productcss.btn} disabled={currentPage === 1}>
                    &lt;
                </button>
            }
            {
                pageNumber.map((num) => (
                    <li style={{listStyle: 'none', display:'inline'}} key={num} onClick={() => setCurrentPage(num)}>
                        <button className={productcss.btn} style={currentPage === num ? {backgroundColor : 'gray'} : null}>
                            {num}
                        </button>
                    </li>
                ))
            }
            {
                Array.isArray(productList) && <button className={productcss.btn} onClick={() => setCurrentPage(currentPage+1)}
                disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                >
                    &gt;
                </button>
                
            }
            <button className={productcss.registbtn} onClick={onClickProductRegister}>
                    상품등록
             </button>
        </div>
    </div>
    )
} export default ProductManagement;