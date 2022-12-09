import React, {useEffect} from "react";
import App from "next/app";
import AppLayout from "../layouts/AppLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-modal-video/scss/modal-video.scss";
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lg-thumbnail.scss';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'hover.css/scss/hover.scss';
import '../styles/App.scss';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {appWithTranslation} from 'next-i18next';
import Seo from "../components/Seo";
import MainLayout from "../layouts/MainLayout";
import {initialProps} from "../ulti/helper";


const MyApp = ({Component, pageProps}) => {

    const getLayout = Component.getLayout || ((page) => {
        return <MainLayout {...pageProps}>
            {page}
        </MainLayout>
    });

    return <SSRProvider>
        <Seo {...pageProps} />
        <AppLayout {...pageProps}>
            {getLayout(<Component {...pageProps} />)}
        </AppLayout>
    </SSRProvider>
};

MyApp.getInitialProps = async (context) => {
    const appInitialProps = await App.getInitialProps(context);
    const {locale = "vi"} = context;
    let initProps = {};
    try {
        const data = await initialProps(context.ctx);
        initProps = {
            ...data
        }
    } catch (e) {
        console.error(`MyApp.getInitialProps`, e);
    }

    return {
        ...appInitialProps,
        pageProps: {
            ...initProps,
        },
    }
};

export default appWithTranslation(MyApp);
