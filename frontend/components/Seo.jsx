import Head from "next/head";
import React from "react";
import {getImageUrl} from "../ulti/helper";

const Seo = ({seo = {}, seoCustom = {}}) => {
    // console.log("SEO", seo)
    const structData1 = seo.structuredData ? seo.structuredData : [];
    const structData2 = seoCustom.structuredData ? seoCustom.structuredData : [];
    const structuredData = [
        ...structData1,
        ...structData2
    ];

    const finalSeo = {
        ...seo,
        ...seoCustom,
    };

    const {
        metaTitle = "Seo default",
        metaDescription = "Seo default",
        metaRobots = "index, follow",
        keywords = "",
        metaViewport = "width=device-width, initial-scale=1",
        canonicalURL = "",
        metaImage,
        metaSocial
    } = finalSeo;

    const metaImageData = metaImage?.data?.attributes ? metaImage.data.attributes
        : null;

    const SocialMetaTags = () => {
        let metaTags = [];
        if (!metaSocial || metaSocial.length === 0) {
            metaTags.push(<meta key={"metaOgTitle"} property="og:title"
                                content={metaTitle}/>);
            metaTags.push(<meta key={"metaOgDescription"} property="og:description"
                                content={metaDescription}/>);
            metaTags.push(<meta key={"metaTwTitle"} name="twitter:title"
                                content={metaTitle}/>);

            if (metaImageData) {
                metaTags.push(<meta key={"metaOgImage"} property="og:image"
                                    content={getImageUrl(metaImageData.url)}/>);
                metaTags.push(<meta key={"metaTwImage"} property="og:image"
                                    content={getImageUrl(metaImageData.url)}/>);
            }
        } else {
            metaSocial.map(metaSocialItem => {
                const customShareImage = metaSocialItem.image?.data ? metaSocialItem.image?.data.attributes : null;
                if (metaSocialItem.socialNetwork === 'Facebook') {
                    metaTags.push(<meta key={"metaOgTitle"} property="og:title"
                                        content={metaSocialItem.title}/>);
                    metaTags.push(<meta key={"metaOgDescription"} property="og:description"
                                        content={metaSocialItem.description}/>);
                    if (customShareImage) {
                        metaTags.push(<meta key={"metaOgImage"} property="og:image"
                                            content={getImageUrl(customShareImage.url)}/>);
                    }
                } else if (metaSocialItem.socialNetwork === 'Twitter') {
                    metaTags.push(<meta key={"metaTwTitle"} property="twitter:title"
                                        content={metaSocialItem.title}/>);
                    if (customShareImage) {
                        metaTags.push(<meta key={"metaTwImage"} property="twitter:image"
                                            content={getImageUrl(customShareImage.url)}/>);
                    }
                }
            });
        }
        return metaTags;
    };

    return <Head>
        <title>{metaTitle}</title>
        <meta key={"charset"} charSet="utf-8"/>
        <meta key={"viewport"} name="viewport"
              content={"width=device-width, initial-scale=1"}/>
        <meta key={"mainDescription"} name="description"
              content={metaDescription}/>
        <meta key="metaRobot" name="robots" content={metaRobots}/>
        <meta key="metaKeywords" name="keywords" content={keywords}/>
        <link rel="canonical" href={canonicalURL}/>
        {structuredData &&
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}/>
        }
        {SocialMetaTags().map(item => item)}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png"/>
    </Head>;
};

export default Seo;