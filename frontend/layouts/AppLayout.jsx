import React, {useEffect, useState} from "react";
import Seo from "../components/Seo";
import MainLayout from "./MainLayout";
import {createContext, useContext} from 'react';
import FacebookChatScript from "../components/AppScript/FacebookChatScript";
import GaScript from "../components/AppScript/GaScript";
import {isVisible} from "bootstrap/js/src/util";
import {ToastContainer} from "react-toastify";
import FloatingButton from "../components/FloatingButton";

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
            <FloatingButton icon={"material-symbols:shopping-cart-outline"} onClick={() => setCartModal(prevState => ({
                ...prevState,
                isVisible: true,
            }))}/>
            <ToastContainer/>
        </AppContext.Provider>
    )
};

export default AppLayout;

export function useAppContext() {
    return useContext(AppContext);
}