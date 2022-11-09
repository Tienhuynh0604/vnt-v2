import React, {useEffect} from "react";
import AppLayout from "../layouts/AppLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-modal-video/scss/modal-video.scss";
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import '../styles/App.scss';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {appWithTranslation} from 'next-i18next';
import Seo from "../components/Seo";
import MainLayout from "../layouts/MainLayout";

const MyApp = ({Component, pageProps}) => {

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    const getLayout = Component.getLayout || ((page) => {
        return <MainLayout {...pageProps}>
            {page}
        </MainLayout>
    });

    return <SSRProvider>
        <Seo {...pageProps}/>
        <AppLayout {...pageProps}>
            {getLayout(<Component {...pageProps} />)}
        </AppLayout>
    </SSRProvider>
};

// MyApp.getInitialProps = async (context) => {
//     console.log(context);
//     const pageProps = await App.getInitialProps(context);
//     console.log("pageProps", pageProps);
//     let initialProps = {
//         ...pageProps
//     };
//     let seo = {
//         metaTitle: 'Vietlife',
//         metaDescription: 'Create seo in admin',
//         keywords: 'vietlife',
//         metaRobots: 'noindex',
//         structuredData: null,
//         metaViewport: null,
//         canonicalURL: null,
//         metaImage: null,
//         metaSocial: null
//     };
//     let commonData = {
//     };
//     try {
//         const query = {
//             populate: {
//                 seo: seoPopulate(),
//             }
//         };
//         const res = await callGet("/site-name", query);
//         const {data} = res;
//         if(data.attributes.seo){
//             seo = {
//                 ...seo,
//                 ...data.attributes.seo
//             }
//         }
//
//         commonData = {
//             ...data.attributes,
//         };
//
//         delete commonData.seo;
//     } catch (e) {
//         console.error(e);
//     }
//
//     initialProps = {
//         common: commonData,
//         seo,
//         ...initialProps
//     };
//
//     console.log(initialProps);
//
//     return initialProps;
// };

export default appWithTranslation(MyApp);
