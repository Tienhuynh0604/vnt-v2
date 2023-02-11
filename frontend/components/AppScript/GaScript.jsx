import React from "react";
import Script from "next/script";

const GaScript = ({gaTags = []}) => {

    const GaTag = ({gaId}) => {
        return <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id${gaId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){window.dataLayer.push(arguments);}
                      gtag('js', new Date());
            
                      gtag('config', "${gaId}");
                    `}
            </Script>
        </>
    };

    return gaTags.map((item, idx) => {
        return <GaTag gaId={item} key={`ga_${idx}`}/>
    })

};

export default GaScript;