import React, {useEffect, useState} from "react";
import {createContext, useContext} from 'react';
import FacebookChatScript from "../components/AppScript/FacebookChatScript";
import GaScript from "../components/AppScript/GaScript";
import {ToastContainer} from "react-toastify";
import CartFloatingButton from "../components/cart/CartFloatingButton";

const AppContext = createContext({});

const AppLayout = (props) => {
    const {headerMenus, footerMenus, seo, common, locale, children, destinations} = props;
    const [bookingModal, setBookingModal] = useState({
        isVisible: false,
        productId: null,
        bookingType: null,
        item: {
            id: 1,
        }
    });

    const [cartModal, setCartModal] = useState({
        isVisible: false,
        items: []
    });

    const [checkOutItems, setCheckOutItems] = useState([]);

    const openContactBooking = (productName) => {
        setBookingModal(prev => ({
            ...prev,
            isVisible: true,
            bookingType: "contact",
            productName
        }))
    };

    let sharedState = {
        headerMenus,
        footerMenus,
        seo,
        destinations,
        common,
        locale,
        bookingModal,
        setBookingModal,
        cartModal,
        setCartModal,
        checkOutItems,
        setCheckOutItems,
        openContactBooking,
    };

    useEffect(() => {
        setCartModal(prevState => ({
            ...prevState,
            isVisible: false,
        }));
    }, []);

    return (
        <AppContext.Provider value={sharedState}>
            {children}
            <FacebookChatScript facebookPageId={common.fbId}/>
            <GaScript gaTags={common.gaId ? common.gaId.split(",") : []}/>
            <CartFloatingButton/>
            <ToastContainer/>
        </AppContext.Provider>
    )
};

export default AppLayout;

export function useAppContext() {
    return useContext(AppContext);
}