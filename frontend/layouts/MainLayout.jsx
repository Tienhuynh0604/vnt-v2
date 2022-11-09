import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import React from "react";

const MainLayout = ({children}) => {

    return (
        <>
            <NavBar/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
};

export default MainLayout;