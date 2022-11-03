import Head from "next/head";
import React from "react";
import {getImageUrl} from "../ulti/helper";

const Seo = ({seo}) => {
    // console.log("SEO", seo)

    if (!seo) {
        return <></>;
    }

    const {
        metaTitle = "Seo default",
        metaDescription = "Seo default",
        metaRobots = "index, follow",
        keywords = "",
        structuredData,
        metaViewport = "width=device-width, initial-scale=1",
        canonicalURL = "",
        metaImage,
        metaSocial
    } = seo;

    const metaImageData = metaImage && metaImage.data ? metaImage.data.attributes : null;

    const SocialMetaTags = () => {
        let metaTags = [];
        if (!metaSocial) {
            metaTags.push(<meta key={"metaOgTitle"} property="og:title"
                                content={metaTitle}/>);
            metaTags.push(<meta key={"metaOgDescription"} property="og:description"
                                content={metaDescription}/>);
            metaTags.push(<meta key={"metaTwTitle"} name="twitter:title"
                                content={metaTitle}/>)

            if (metaImageData) {
                metaTags.push(<meta key={"metaOgImage"} property="og:image"
                                    content={getImageUrl(metaImageData.url)}/>);
                metaTags.push(<meta key={"metaTwImage"} property="og:image"
                                    content={getImageUrl(metaImageData.url)}/>);
            }
        } else {
            metaSocial.map(metaSocialItem => {
                const customShareImage = metaSocialItem.image ? metaSocialItem.image.data.attributes : null;
                if (metaSocialItem.socialNetwork === 'Facebook') {
                    metaTags.push(<meta key={"metaOgTitle"} property="og:title"
                                        content={metaSocialItem.title}/>);
                    metaTags.push(<meta key={"metaOgDescription"} property="og:description"
                                        content={metaSocialItem.description}/>)
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
    </Head>;
};

export default Seo;