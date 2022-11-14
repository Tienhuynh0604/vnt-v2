import React, {useEffect, useState} from "react";
import Seo from "../components/Seo";
import MainLayout from "./MainLayout";
import {createContext, useContext} from 'react';
import FacebookChatScript from "../components/AppScript/FacebookChatScript";
import GaScript from "../components/AppScript/GaScript";
import {isVisible} from "bootstrap/js/src/util";

const AppContext = createContext({});

const AppLayout = (props) => {
    const {headerMenus, footerMenus, seo, common, locale = "vi", children} = props;
    const [bookingModal, setBookingModal] = useState({
        isVisible: false,
        item: {
            id: 1,
        }
    });

    const [cartModal, setCartModal] = useState({
        isVisible: false,
        items: []
    });

    let sharedState = {
        headerMenus,
        footerMenus,
        seo,
        common,
        locale,
        bookingModal,
        setBookingModal,
        cartModal,
        setCartModal,
    };

    useEffect(() => {
        setCartModal(prevState => ({
            ...prevState,
            isVisible: true,
        }));
    }, []);

    return (
        <AppContext.Provider value={sharedState}>
            {children}
            <FacebookChatScript facebookPageId={common.fbId}/>
            <GaScript gaTags={common.gaId ? common.gaId.split(",") : []}/>
        </AppContext.Provider>
    )
};

export default AppLayout;

export function useAppContext() {
    return useContext(AppContext);
}