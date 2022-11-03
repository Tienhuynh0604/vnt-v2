import React, {useEffect, useState} from "react";
import {getArticleModels} from "../../services/ArticleService";
import {Button, Col, Row} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import {formatDate, getImageUrl} from "../../ulti/helper";
import {Icon} from "@iconify/react";
import {renderImage} from "../../ulti/appUtil";

const ListServiceArticles = ({basePath, model, category, locale = 'vi'}) => {
    const [articles, setArticles] = useState(model);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setArticles(model);
    }, [model]);

    const onClickLoadMore = async (page) => {
        setLoading(true);
        let models = await getArticleModels(category.attributes.slug, page, locale);
        setArticles({
            data: [
                ...articles.data,
                ...models.data,
            ],
            meta: models.meta
        });
        setLoading(false);
    };

    return <>
        <Row>
            <Col xs={12} md={8} className="service-category-item">
                {
                    articles.data.slice(0, 1).map((item, idx) => {
                        const url = `${basePath}/${category.attributes.slug}/${item.attributes.slug}`;
                        return (
                            <div key={`s1_${idx}`} className="latest-new-item item-big">
                                {<Link href={url}>
                                    <a>
                                        {renderImage(item)}
                                    </a>
                                </Link>}
                                <div className="my-2">
                                    <Link href={url}>
                                        <a>
                                            <h3>{item.attributes.title}</h3>
                                        </a>
                                    </Link>
                                    <Icon color="#0071DC" width={20} height={20}
                                          icon="ant-design:clock-circle-outlined"/>
                                    <small>{' '}{formatDate(item.attributes.createdAt)}</small>
                                </div>
                                <p>{item.attributes.shortDescription}</p>
                            </div>
                        )
                    })
                }
            </Col>
            <Col xs={12} md={4}>
                {
                    articles.data.length > 1 && articles.data.slice(1, 5).map((item, idx) => {
                        const url = `${basePath}/${category.attributes.slug}/${item.attributes.slug}`;
                        return (
                            <Row key={`s2_${idx}`} className="latest-new-item item-mini mb-2">
                                <Col xs={4} md={6}>
                                    {<Link href={url}>
                                        <a>
                                            {renderImage(item)}
                                        </a>
                                    </Link>}
                                </Col>
                                <Col xs={8} md={6}>
                                    <Link href={url}>
                                        <a>
                                            <h3>{item.attributes.title}</h3>
                                        </a>
                                    </Link>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Col>
            {
                articles.data.length > 5 && articles.data.slice(5, articles.data.length).map((item, idx) => (
                    <Col key={`s3_${idx}`} xs={12} className="my-2">
                        <Row className="latest-new-item">
                            <Col xs={4}>
                                {<Link href={`${basePath}/${category.attributes.slug}/${item.attributes.slug}`}>
                                    <a>
                                        {renderImage(item)}
                                    </a>
                                </Link>}
                            </Col>
                            <Col xs={8}>
                                <Link href={`${basePath}/${category.attributes.slug}/${item.attributes.slug}`}>
                                    <a><h3>{item.attributes.title}</h3></a>
                                </Link>
                                <div className="mb-3">
                                    <Icon color="#0071DC" width={20} height={20}
                                          icon="ant-design:clock-circle-outlined"/>
                                    <small>{' '}{formatDate(item.attributes.createdAt)}</small>
                                </div>
                                <p>{item.attributes.shortDescription}</p>
                            </Col>
                        </Row>
                    </Col>
                ))
            }
        </Row>

        {articles.meta.pagination.page < articles.meta.pagination.pageCount
        && (<div className="d-flex justify-content-center">
            <Button onClick={() => onClickLoadMore(articles.meta.pagination.page + 1)}
                    disabled={loading}
                    style={{width: "350px"}}
                    className="btn-send btn btn-success text-light">
                Xem thêm
            </Button>
        </div>)}
    </>
};

export default ListServiceArticles;