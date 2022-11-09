/** @type {import('next').NextConfig} */
const {i18n} = require('./next-i18next.config');

let resourceDomains = process.env.RESOUCE_DOMAIN;
if(resourceDomains){
    resourceDomains = resourceDomains.split(",");
    console.log(resourceDomains);
}

const nextConfig = {
    experimental: {
        appDir: false,
        transpilePackages: ['react-modal-video', "react-image-gallery"],
    },
    i18n,
    images: {
        domains: ['*', ...resourceDomains]
    },
};

module.exports = nextConfig;
