import React from "react";
import Seo from "../components/Seo";
import MainLayout from "./MainLayout";
import {createContext, useContext} from 'react';

const AppContext = createContext({});

const AppLayout = (props) => {
    const {children, headerMenus, footerMenus, seo, common, locale = "vi"} = props;
    let sharedState = {
        headerMenus,
        footerMenus,
        seo,
        common,
        locale
    };

    return (
        <AppContext.Provider value={sharedState}>
            <MainLayout {...props}>
                {children}
            </MainLayout>
        </AppContext.Provider>
    )
};

export default AppLayout;

export function useAppContext() {
    return useContext(AppContext);
}