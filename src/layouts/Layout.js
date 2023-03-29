import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import layoutcss from "./Layout.module.css";

function Layout (){
    return (
        <>
            <Header/>
            <Navbar/>
            <main className={layoutcss.main}>
            <Outlet/>
            </main>
            <Footer/>
        </>
    );
}
export default Layout;