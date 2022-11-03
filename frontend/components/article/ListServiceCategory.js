import React, {useEffect, useState} from "react";
import {getArticleModels} from "../../services/ArticleService";
import {Button, Col, Container, Row} from "react-bootstrap";
import Image from "next/image";
import {getImageUrl} from "../../ulti/helper";
import Link from "next/link";

const ListServiceCategory = ({
                                 mainCategorySlug,
                                 articleModels = {
                                     data: [],
                                     meta: {
                                         pagination: {
                                             page: 1,
                                             pageCount: 1
                                         }
                                     }
                                 },
                                 categoryModels = [],
                                 locale = 'vi'
                             }) => {

    const [articles, setArticles] = useState(articleModels);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setArticles(articleModels);
    }, [articleModels]);

    const onClickLoadMore = async (page) => {
        setLoading(true);
        let models = await getArticleModels(mainCategorySlug, page, locale);
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
        <Row gutter={[16, 16]} className="mb-3">
            {categoryModels.map((item, idx) => {
                const {id, attributes} = item;
                return <Col key={`sp${id}`} xs={12} md={6} xl={4} className={"service-page-item"}>
                    <div className="image-content rounded-4">
                        {attributes.thumb && attributes.thumb.data &&
                        <Image src={getImageUrl(attributes.thumb.data.attributes.url)}
                               layout="responsive"
                               className="rounded-4"
                               alt={attributes.thumb.data.attributes.name}
                               width={attributes.thumb.data.attributes.width}
                               height={attributes.thumb.data.attributes.height}
                        />
                        }

                        <div className='hover-content'>
                            <Link href={`/${mainCategorySlug}/${attributes.slug}`}>
                                <a className="">{attributes.description}</a>
                            </Link>
                        </div>
                    </div>
                    <Link href={`/${mainCategorySlug}/${attributes.slug}`}>
                        <a><h5 className="mt-2 mb-3">{attributes.name}</h5></a>
                    </Link>
                </Col>
            })}
            {articles.data.map((item, idx) => {
                const {id, attributes} = item;
                const url = `/${mainCategorySlug}/single/${attributes.slug}`;
                return <Col key={`at${id}`} xs={12} md={6} xl={4} className={"service-page-item"}>
                    <div className="image-content">
                        {attributes.thumbnail && attributes.thumbnail.data &&
                        <Image src={getImageUrl(attributes.thumbnail.data.attributes.url)}
                               layout="responsive"
                               className="rounded-4"
                               alt={attributes.thumbnail.data.attributes.name}
                               width={attributes.thumbnail.data.attributes.width}
                               height={attributes.thumbnail.data.attributes.height}
                        />
                        }

                        <div className='hover-content'>
                            <Link href={url}>
                                <a className="">{attributes.shortDescription}</a>
                            </Link>
                        </div>
                    </div>
                    <Link href={url}>
                        <a><h5 className="mt-2 mb-3">{attributes.title}</h5></a>
                    </Link>
                </Col>
            })}
        </Row>
        {articleModels.meta.pagination.page < articleModels.meta.pagination.pageCount
        && (<div className="d-flex justify-content-center">
            <Button onClick={() => onClickLoadMore(articleModels.meta.pagination.page + 1)}
                    disabled={loading}
                    style={{width: "350px"}}
                    className="btn-send btn btn-success text-light">
                Xem thêm
            </Button>
        </div>)}
    </>
};

export default ListServiceCategory;