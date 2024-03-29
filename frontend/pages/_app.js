import React, { useEffect } from "react";
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
import 'react-loading-skeleton/dist/skeleton.css'
import "react-image-gallery/styles/scss/image-gallery.scss";
import '../styles/App.scss';
import 'nprogress/nprogress.css'
import SSRProvider from 'react-bootstrap/SSRProvider';
import { appWithTranslation } from 'next-i18next';
import Seo from "../components/Seo";
import MainLayout from "../layouts/MainLayout";
import { initialProps } from "../ulti/helper";
import ErrorBoundary from "../layouts/ErrorBoundary";


const MyApp = ({ Component, pageProps }) => {

    const getLayout = Component.getLayout || ((page) => {
        return <MainLayout {...pageProps}>
            {page}
        </MainLayout>
    });

    return <SSRProvider>
        {/* <ErrorBoundary> */}
            <Seo {...pageProps} />
            <AppLayout {...pageProps}>
                {getLayout(<Component {...pageProps} />)}
            </AppLayout>
        {/* </ErrorBoundary> */}
    </SSRProvider>
};

MyApp.getInitialProps = async (context) => {
    const appInitialProps = await App.getInitialProps(context);
    let initProps = {};
    try {
        const data = await initialProps(context.ctx);
        initProps = {
            ...data
        }
    } catch (e) {
        console.error(`MyApp.getInitialProps`, e);
        return { notFound: true }
    }

    return {
        ...appInitialProps,
        pageProps: {
            ...initProps,
        },
    }
};

export default appWithTranslation(MyApp);
