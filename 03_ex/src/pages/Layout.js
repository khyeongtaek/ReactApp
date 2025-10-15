import React from 'react';
import {Link, Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div>
            <h1>Layout</h1>
            <Header/>
            <nav>
                <Link to={"board"}>Board</Link> | <Link to={"user"}>user</Link>
            </nav>
            <Outlet/>
            <Footer/>

        </div>
    );
};

export default Layout;