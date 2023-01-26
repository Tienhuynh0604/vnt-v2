import {getImageUrl} from "./helper";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {Icon} from "@iconify/react";
import qs from "qs";

export const strapiImg = (img, className = ''
    , fill = false
    , priority = false
    , size = "default"
    , quality = 75
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
        alt: img.attributes?.name,
        src: getImageUrl(url),
        priority,
        quality
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

export const strapPagination = (path, pagination, query) => {

    let backLink = "#";
    if (pagination.page > 1) {
        query = {
            ...query,
            page: pagination.page - 1
        };
        backLink = `${path}?${qs.stringify(query)}`;
    }

    let nextLink = "#";
    if (pagination.page < pagination.pageCount) {
        query = {
            ...query,
            page: pagination.page + 1
        };
        nextLink = `${path}?${qs.stringify(query)}`;
    }

    return (
        <ul className="pagination justify-content-center mt-4">
            <li className="page-item">
                <Link className={`page-link ${backLink === "#" ? "disabled" : ""}`} href={backLink}>
                    <Icon icon={"akar-icons:chevron-left"}/>
                </Link>
            </li>
            <li className="page-item">
                <Link className="page-link active" href={"#"}>{pagination.page}</Link>
            </li>
            <li className="page-item">
                <Link className={`page-link ${nextLink === "#" ? "disabled" : ""}`} href={nextLink}>
                    <Icon icon={"akar-icons:chevron-right"}/>
                </Link>
            </li>
        </ul>
    )
};

export const strapPaginationWithOnChangePage = (onChangePage, pagination) => {

    let hasBack = false;
    if (pagination.page > 1) {
        hasBack = true;
    }

    let hasNext = false;
    if (pagination.page < pagination.pageCount) {
        hasNext = true;
    }

    return (
        <ul className="pagination justify-content-center mt-4">
            <li className="page-item">
                <Link className={`page-link ${!hasBack ? "disabled" : ""}`}
                      onClick={() => onChangePage(pagination.page - 1)}
                      href={"#"}>
                    <Icon icon={"akar-icons:chevron-left"}/>
                </Link>
            </li>
            <li className="page-item">
                <Link className="page-link active" href={"#"}>{pagination.page}</Link>
            </li>
            <li className="page-item">
                <Link className={`page-link ${!hasNext ? "disabled" : ""}`}
                      href={"#"}
                      onClick={() => onChangePage(pagination.page + 1)}
                >
                    <Icon icon={"akar-icons:chevron-right"}/>
                </Link>
            </li>
        </ul>
    )
};