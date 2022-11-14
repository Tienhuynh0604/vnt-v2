import React from "react";
import Script from "next/script";

const GaScript = ({gaTags = []}) => {
    return <>
        {gaTags.map((item, idx) => {
            return <>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id${item}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){window.dataLayer.push(arguments);}
                      gtag('js', new Date());
            
                      gtag('config', "${item}");
                    `}
                </Script>
            </>
        })}
    </>
};

export default GaScript;