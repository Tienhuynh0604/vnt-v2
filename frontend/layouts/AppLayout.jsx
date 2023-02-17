import React, {useEffect, useState} from "react";
import {createContext, useContext} from 'react';
import FacebookChatScript from "../components/AppScript/FacebookChatScript";
import GaScript from "../components/AppScript/GaScript";
import {ToastContainer} from "react-toastify";
import CartFloatingButton from "../components/cart/CartFloatingButton";
import { useRouter } from "next/router";
import NProgress from 'nprogress';

const AppContext = createContext({});

const AppLayout = (props) => {
    const router = useRouter();
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

    const [currentDes, setCurrentDes] = useState(null);

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
        setCurrentDes,
        currentDes
    };

    useEffect(() => {
        router.events.on('routeChangeStart', () =>  NProgress.start());
        router.events.on('routeChangeComplete', () =>  NProgress.done());
        router.events.on('routeChangeError', () =>  NProgress.done());
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