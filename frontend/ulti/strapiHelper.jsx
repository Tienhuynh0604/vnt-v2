import {getImageUrl} from "./helper";
import Image from "next/image";
import React from "react";

export const strapiImg = (img, className = '', fill = false, size = "default"
    , staticWidth = null, staticHeight = null) => {

    if (!img) {
        return "";
    }
    let url = img.attributes.url;
    let width = staticWidth ? staticWidth : img.attributes.width;
    let height = staticHeight ? staticHeight : img.attributes.height;

    switch (size) {
        case "large":
            if (img.attributes?.formats?.large) {
                url = img.attributes.formats.large?.url;
                width = img.attributes.formats.large?.width;
                height = img.attributes.formats.large?.height;
            }
            break;
        case "medium":
            if (img.attributes?.formats?.medium) {
                url = img.attributes.formats.medium?.url;
                width = img.attributes.formats.medium?.width;
                height = img.attributes.formats.medium?.height;
            }
            break;
        case "small":
            if (img.attributes?.formats?.small) {
                url = img.attributes.formats.small?.url;
                width = img.attributes.formats.small?.width;
                height = img.attributes.formats.small?.height;
            }
            break;
        case "thumbnail":
            if (img.attributes?.formats?.thumbnail) {
                url = img.attributes.formats.thumbnail?.url;
                width = img.attributes.formats.thumbnail?.width;
                height = img.attributes.formats.thumbnail?.height;
            }
            break;
    }

    let props = {
        alt: img.attributes?.alternativeText ? img.attributes?.alternativeText : img.attributes?.name,
        src: getImageUrl(url),
    };
    if (fill) {
        props = {
            ...props,
            fill,
            objectFit: "cover"
        }
    } else {
        props = {
            ...props,
            width,
            height
        }
    }

    return <Image className={`${className}`} {...props}/>
};