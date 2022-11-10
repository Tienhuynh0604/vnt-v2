import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import React from "react";
import BookingModal from "../components/booking/BookingModal";

const MainLayout = ({children}) => {

    return (
        <>
            <NavBar/>
            <main>
                {children}
            </main>
            <BookingModal/>
            <Footer/>
        </>
    )
};

export default MainLayout;