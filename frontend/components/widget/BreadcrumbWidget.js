import React, {memo} from "react";
import {Breadcrumb, BreadcrumbItem} from "react-bootstrap";

const BreadcrumbWidget = (props) => {

    const {className, categories = [], title} = props;

    return (
        <Breadcrumb className={`${className}`}>
            <Breadcrumb.Item key={`brc_${0}`} href="/">Trang chủ</Breadcrumb.Item>
            {categories && categories.map((item, idx) => {
                return <Breadcrumb.Item key={`brc_${idx}`}
                                        href={`${item.path}`}>
                    {item.name}
                </Breadcrumb.Item>
            })}
        </Breadcrumb>
    );
};


export default memo(BreadcrumbWidget);