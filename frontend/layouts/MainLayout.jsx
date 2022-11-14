import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import React from "react";
import BookingModal from "../components/booking/BookingModal";
import CartModal from "../components/cart/CartModal";

const MainLayout = ({children}) => {

    return (
        <>
            <div id="fb-root"/>
            <div id="fb-customer-chat" className="fb-customerchat"/>
            <NavBar/>
            <main>
                {children}
            </main>
            <Footer/>
            <BookingModal/>
            <CartModal/>
        </>
    )
};

export default MainLayout;