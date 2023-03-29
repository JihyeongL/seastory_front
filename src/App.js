import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/member/Login';
import Register from './pages/member/Register';
import Main from './components/common/Main';
import LicenseDetail from './pages/products/LicenseDetail';
import AllProducts from './pages/products/AllProducts';
import Licenses from './pages/products/Licenses';
import ProductManagement from './pages/admin/ProductManagement'
import ProductRegist from './pages/admin/ProductRegist'
import ProductUpdate from './pages/admin/ProductUpdate';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element= {<Layout/>}>
      <Route index element={<Main/>}/>
      <Route path="/allproducts" element={<AllProducts/>}/>
      <Route path="/product/:licenseCode" element={<LicenseDetail/>}/>
      <Route path="/licenses" element={<Licenses/>}/>
    <Route path="/product-management" element={ <ProductManagement/> } />
    <Route path="/product-regist" element={ <ProductRegist/> } />
    <Route path="/product-update/:licenseCode" element={<ProductUpdate/>}/>
    </Route>
    <Route path='/login' element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
