import Image from "next/image";
import {getImageUrl} from "./helper";
import absoluteUrl from 'next-absolute-url'
import React from "react";
import {Icon} from "@iconify/react";
import Link from "next/link";
import {AGE_GROUP_ADULT, AGE_GROUP_CHILD} from "./appConst";
import {Col, Row} from "react-bootstrap";

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

export const createSimpleSeo = (req, basePath, title, locale = "en") => {
    return {
        canonicalURL: createCanonicalUrl(`/${locale}${basePath ? basePath : ""}`, req),
        metaTitle: title
    };
};

export const createSeoFromCategory = (req, basePath = null, model = null, locale = "en") => {
    let seo = {};
    if (!model || !req) {
        return seo;
    }
    seo.canonicalURL = createCanonicalUrl(`/${locale}${basePath ? basePath : ""}/${model.attributes.slug}`, req);
    if (model.seo) {
        return {
            ...model.seo,
            canonicalURL: seo.canonicalURL
        };
    }

    seo.metaTitle = `${locale === "en" ? model.attributes.name_en : model.attributes.name}`;
    seo.metaDescription = `${locale === "en" ? model.attributes.shortDescription_en : model.attributes.shortDescription}`;
    if (model.attributes.thumb && model.attributes.thumb.data) {
        seo.metaImage = model.attributes.thumb;
    }
    seo.metaSocial = null;
    return seo;
};

export const createSeoFromTour = (req, basePath = null, model = null, locale = "en") => {
    let seo = {};
    if (!model || !req) {
        return seo;
    }
    seo.canonicalURL = createCanonicalUrl(`/${locale}${basePath ? basePath : ""}/${model.attributes.slug}`, req);

    if (model.seo) {
        return {
            ...model.seo,
            canonicalURL: seo.canonicalURL
        };
    }

    seo.metaTitle = `${model.attributes.title}`;
    seo.metaDescription = `${model.attributes.shortDescription}`;
    if (model.attributes?.images?.data?.length > 0) {
        seo.metaImage = {
            data: model.attributes?.images?.data[0]
        };
    }
    seo.metaSocial = null;
    return seo;
};

export const createSeoFromArticle = (req, basePath = null, model = null, locale = "en") => {
    let seo = {};
    seo.canonicalURL = createCanonicalUrl(
        `/${locale}${basePath}/${model.attributes.slug}`,
        req
    );

    if (model.seo) {
        return {
            ...model.seo,
            canonicalURL: seo.canonicalURL
        };
    }

    seo.metaTitle = `${model.attributes.title}`;
    seo.metaDescription = model.attributes.shortDescription;

    if (model.attributes.thumb?.data) {
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

export const renderFillImage = (image, props = {}) => {
    if (!image || !image.data) {
        return "";
    }


    return <Image alt={image.data.attributes.name}
                  src={getImageUrl(image.data.attributes.url)}
                  fill
                  style={{objectFit:"cover"}}
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

export const getMinPriceMaxPrice = (type, priceList, locale) => {
    let minAdultPrice = 0;
    let minChildPrice = 0;

    try {

        priceList.forEach((item) => {
            if (item.age_group === AGE_GROUP_ADULT) {
                if (locale === "vi") {
                    if (minAdultPrice === 0 || item.price < minAdultPrice) {
                        minAdultPrice = item.price;
                    }
                } else if (locale === "en") {
                    if (minAdultPrice === 0 || item.usd_price < minAdultPrice) {
                        minAdultPrice = item.usd_price;
                    }
                }
            } else if (item.age_group === AGE_GROUP_CHILD) {
                if (locale === "vi") {
                    if (minChildPrice === 0 || item.price < minChildPrice) {
                        minChildPrice = item.price;
                    }
                } else if (locale === "en") {
                    if (minChildPrice === 0 || item.usd_price < minChildPrice) {
                        minChildPrice = item.usd_price;
                    }
                }
            }
        });
    } catch (e) {
        console.error(e.message);
    }

    return [minChildPrice, minAdultPrice];
};

export const renderListWithIconValue = (mainItem) => {
    const mainClass = mainItem.style?.split(" ")[0] ? mainItem.style?.split(" ")[0] : "";
    switch (mainClass) {
        case 'check-block': {
            return <Row>
                {mainItem.values?.map((item, idx) => {
                    return <Col xs={12} md={6}
                                className={`highlight-item ${mainItem.style}`}
                                key={`cb_${mainItem.id}${idx}`}>
                        <Icon icon={item.iconClass} height={24}/>
                        {item.displayText}
                    </Col>
                })}
            </Row>
        }
        case 'wtb-block': {
            return <div className="icon-flex-wrap">
                {mainItem.values?.map((item, idx) => {
                    return <div className={`btn-icon ${mainItem.style}`}
                                key={`wtb_${mainItem.id}${idx}`}>
                        <Icon icon={item.iconClass} height={45}/>
                        <br/>
                        <span>{item.displayText}</span>

                    </div>
                })}
            </div>
        }
        case 'cancellation-block': {
            return <div>
                {mainItem.values?.map((item, idx) => {
                    return <Row key={`canb_${mainItem.id}${idx}`} className={mainItem.style}>
                        <Col xs={6}>{item.displayText}</Col>
                        <Col xs={6} className="fw-bold">{item.value}</Col>
                    </Row>
                })}
            </div>
        }
        case 'check-in-block': {
            return <ul className={mainItem.style}>
                {mainItem.values?.map((item, idx) => {
                    return <li key={`cib_${mainItem.id}${idx}`}>{item.displayText}</li>
                })}
            </ul>
        }
        default:
            return <i className="text-muted">Unsupported item</i>
    }
};

export const renderDynamicFeature = (item) => {
    if (!item) return "";
    switch (item.__component) {
        case "common.custom-ck-editor":
            return <div dangerouslySetInnerHTML={{
                __html: item.content
            }}/>;
        case "common.list-with-icon-value":
            return renderListWithIconValue(item);
        default:
            return <i className="text-muted">Unsupported item</i>
    }
};