import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CategoryNav from "./CategoryNav";

function Layout({ setSearchResults }) {

    return (
        <>
            <Header setSearchResults={setSearchResults} />

            <CategoryNav />

            <Outlet />

            <Footer />
        </>
    )
}

export default Layout;