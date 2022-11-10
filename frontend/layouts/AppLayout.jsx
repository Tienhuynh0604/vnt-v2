import React, {useState} from "react";
import Seo from "../components/Seo";
import MainLayout from "./MainLayout";
import {createContext, useContext} from 'react';

const AppContext = createContext({});

const AppLayout = (props) => {
    const {children, headerMenus, footerMenus, seo, common, locale = "vi"} = props;
    const [bookingModal, setBookingModal] = useState({
        isVisible: false,
        item: {
            id: 1,
        }
    });
    let sharedState = {
        headerMenus,
        footerMenus,
        seo,
        common,
        locale,
        bookingModal,
        setBookingModal
    };

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    )
};

export default AppLayout;

export function useAppContext() {
    return useContext(AppContext);
}