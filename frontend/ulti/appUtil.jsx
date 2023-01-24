import Image from "next/image";
import {getImageUrl} from "./helper";
import absoluteUrl from 'next-absolute-url'
import React from "react";
import {Icon} from "@iconify/react";
import Link from "next/link";

export const renderUrl = (basePath, item) => {
    if (item.attributes.categories
        && item.attributes.categories.data
        && item.attributes.categories.data.length > 0
        && item.attributes.categories.data[0].attributes.slug !== basePath
    ) {
        return `${basePath}/${item.attributes.categories.data[0].attributes.slug}/${item.attributes.slug}`;
    }
    return `${basePath}/single/${item.attributes.slug}`;
};

export const nl2br = (content) => {
    if (!content) return "";
    return content.replace(/(?:\r\n|\r|\n)/g, '<br />')
};

export const createCanonicalUrl = (path, req) => {
    if (!req) {
        return path;
    }
    const {origin} = absoluteUrl(req, 'localhost:3000');
    return `${origin}${path}`;
};

export const createSeoFromFaq = (req, originalSeo, basePath = null, model = null) => {
    let seo = originalSeo;
    if (!model || !req) {
        return seo;
    }
    seo.canonicalURL = createCanonicalUrl(`${basePath ? basePath : ""}/${model.id}`, req);
    if (model.seo) {
        return {
            ...model.seo,
            canonicalURL: seo.canonicalURL
        };
    }
    seo.metaTitle = `${model.attributes.title}`;
    seo.metaDescription = originalSeo.metaDescription;
    seo.metaSocial = null;
    return seo;
};

export const createSeoFromCategory = (req, originalSeo, basePath = null, model = null) => {
    let seo = originalSeo;
    if (!model || !req) {
        return seo;
    }
    seo.canonicalURL = createCanonicalUrl(`${basePath ? basePath : ""}/${model.attributes.slug}`, req);
    if (model.seo) {
        return {
            ...model.seo,
            canonicalURL: seo.canonicalURL
        };
    }

    seo.metaTitle = `${model.attributes.name}`;
    seo.metaDescription = model.attributes.description ? model.attributes.description : originalSeo.metaDescription;
    if (model.attributes.thumb && model.attributes.thumb.data) {
        seo.metaImage = model.attributes.thumb;
    }
    seo.metaSocial = null;
    return seo;
};

export const createSeoFromArticle = (req, originalSeo, basePath = null, model = null) => {
    let seo = originalSeo;
    if (model.categories && model.categories.data.length > 0) {
        seo.canonicalURL = createCanonicalUrl(
            `${basePath ? basePath : "single"}/${model.categories.data[0].attributes.slug}/${model.slug}`,
            req
        );
    } else {
        seo.canonicalURL = createCanonicalUrl(`${basePath}/single/${model.slug}`, req);
    }

    if (model.seo) {
        return {
            ...model.seo,
            canonicalURL: seo.canonicalURL
        };
    }

    seo.metaTitle = `${model.title}`;
    seo.metaDescription = model.shortDescription ? model.shortDescription : originalSeo.metaDescription;

    if (model.thumbnail && model.thumbnail.data) {
        seo.metaImage = model.thumbnail;
    }
    seo.metaSocial = null;
    return seo;
};

export const renderContactItem = (item, keyPrefix = 'ct_item', showDisplayText = true, props = {}) => {
    if (!item) {
        return "";
    }

    const content = <><Icon icon={item.icon}/> {showDisplayText && <span>{item.displayText}</span>}</>;

    switch (item.type) {
        case "Phone":
            return <a key={`${keyPrefix}${item.id}`}
                      href={`tel:${item.link}`}
                      {...props}
            >
                {content}
            </a>;
        case "Email":
            return <a key={`${keyPrefix}${item.id}`}
                      href={`mailTo:${item.link}`}
                      {...props}
            >
                {content}
            </a>;
        default:
            return <Link key={`${keyPrefix}${item.id}`}
                         href={`${item.link}`}
                         {...props}
            >
                {content}
            </Link>
    }
};

export const renderImage = (image, props = {}) => {
    if (!image || !image.data) {
        return "";
    }

    return <Image alt={image.data.attributes.name}
                  src={getImageUrl(image.data.attributes.url)}
                  width={image.data.attributes.width}
                  height={image.data.attributes.height}
                  {...props}
    />
};

export const SlickNextArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={`${className} app-slick-arrow`}
            style={{...style}}
            onClick={onClick}
        >
            <Icon icon={"bi:chevron-right"}/>
        </div>
    );
};

export const SlickPrevArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={`${className} app-slick-arrow`}
            style={{...style}}
            onClick={onClick}
        >
            <Icon icon={"bi:chevron-left"}/>
        </div>
    );
};