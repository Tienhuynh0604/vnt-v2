import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect, useState} from "react";
import {formatDate, initialProps} from "../../ulti/helper";
import {Container, Col, Row, Button} from "react-bootstrap";
import BreadcrumbWidget from "../../components/widget/BreadcrumbWidget";
import {CATEGORY_FAQ, CATEGORY_FAQ_PROMOTION, CATEGORY_HEALTHY_LIFE, CATEGORY_NEWS} from "../../ulti/appConst";
import {callGetArticles, getAllArticleModelByCats, getArticleModels} from "../../services/ArticleService";
import {getServiceCategories, getSingleCategory} from "../../services/CategoryService";
import ListServiceCategory from "../../components/article/ListServiceCategory";
import Link from "next/link";
import {createSeoFromCategory, renderImage, renderUrl} from "../../ulti/appUtil";
import {Icon} from "@iconify/react";
import NavigateSideBarWidget from "../../components/widget/NavigateSideBarWidget";
import FaqFormWidget from "../../components/widget/FaqFormWidget";
import TopServiceWidget from "../../components/widget/TopServiceWidget";
import VideoWidget from "../../components/widget/VideoWidget";
import AdWidget from "../../components/widget/AdWidget";

const Index = (props) => {

    const basePath = `/${CATEGORY_NEWS}`;
    const baseName = "Tin tức";

    const {
        articleModels,
        filterCats,
        promotionArticles,
        locale,
    } = props;

    const [articles, setArticles] = useState(articleModels);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setArticles(articleModels);
    }, [articleModels]);

    const renderHotNews = () => {
        return <Row>
            <Col xs={12} lg={8}>
                {
                    articles.data.slice(0, 1).map((item, idx) => {
                        return (
                            <div key={`s1_${idx}`} className="latest-new-item item-big">
                                {<Link href={renderUrl(basePath, item)}>
                                    <a>
                                        {renderImage(item)}
                                    </a>
                                </Link>}
                                <div className="my-2">
                                    <Link href={renderUrl(basePath, item)}>
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
            <Col xs={12} lg={4}>
                {
                    articles.data.length > 1 && articles.data.slice(1, 3).map((item, idx) => {
                        const url = renderUrl(basePath, item);
                        return (
                            <div key={`s2_${idx}`} className="latest-new-item item-mini mb-2">
                                {<Link href={url}>
                                    <a>
                                        {renderImage(item)}
                                    </a>
                                </Link>}
                                <Link href={url}>
                                    <a>
                                        <h3 className="my-2">{item.attributes.title}</h3>
                                    </a>
                                </Link>
                                <div>
                                    <Icon color="#0071DC" width={20} height={20}
                                          icon="ant-design:clock-circle-outlined"/>
                                    <small>{' '}{formatDate(item.attributes.createdAt)}</small>
                                </div>
                            </div>
                        )
                    })
                }
            </Col>
        </Row>
    };

    const renderPromotion = () => {
        return <Row>
            <Col xs={12} lg={8}>
                {
                    promotionArticles.data.slice(0, 1).map((item, idx) => {
                        return (
                            <div key={`s1_${idx}`} className="latest-new-item item-big">
                                {<Link href={renderUrl(basePath, item)}>
                                    <a>
                                        {renderImage(item)}
                                    </a>
                                </Link>}
                                <div className="my-2">
                                    <Link href={renderUrl(basePath, item)}>
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
            <Col xs={12} lg={4}>
                {
                    promotionArticles.data.length > 1 && articles.data.slice(1, 5).map((item, idx) => {
                        const url = renderUrl(basePath, item);
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
        </Row>
    };

    const onClickLoadMore = async (page) => {
        setLoading(true);
        let models = await getAllArticleModelByCats(filterCats, page, locale);
        setArticles({
            data: [
                ...articles.data,
                ...models.data,
            ],
            meta: models.meta
        });
        setLoading(false);
    };

    const renderRestOfNews = () => {
        return articles.data.length > 3 && articles.data.slice(3, articles.data.length).map((item, idx) => {
            const url = renderUrl(basePath, item);
            return (<Col key={`s3_${idx}`} xs={12} className="my-4">
                    <Row className="latest-new-item">
                        <Col xs={4}>
                            {<Link
                                href={url}>
                                <a>
                                    {renderImage(item)}
                                </a>
                            </Link>}
                        </Col>
                        <Col xs={8}>
                            <Link
                                href={url}>
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
            )
        })

    };

    return (
        <Container fluid className="article-section">
            <Container className="py-5">
                <BreadcrumbWidget title={"Tin tức"}
                                  className={"mb-4"}/>
                <h2 className="title mb-4">Tin tức</h2>
                {renderHotNews()}
            </Container>
            <div className="bg-color-g-b-v-20 py-5">
                <Container>
                    <Row>
                        <Col xs={12} lg={8}>
                            <h2 className="title">Chương trình ưu đãi</h2>
                            {renderPromotion()}
                            <Row>
                                {renderRestOfNews()}
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
                        </Col>
                        <Col xs={12} lg={4}>
                            <FaqFormWidget className="mb-4"/>
                            <TopServiceWidget className="mb-4"/>
                            <VideoWidget className="mb-4"/>
                            <AdWidget/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
    )
};

export default Index;

export const getServerSideProps = async (context) => {
    const {locale = "vi", req} = context;

    let initProps = {};
    let articleModels = [];
    let promotionArticles = [];
    const filterCats = [CATEGORY_NEWS];

    try {
        initProps = await initialProps(context);

        const p1 = getSingleCategory(CATEGORY_NEWS);
        const p2 = getServiceCategories(CATEGORY_NEWS, ['slug']);
        const p3 = getAllArticleModelByCats([CATEGORY_FAQ_PROMOTION]
            , 1
            , locale
            , ['isHome:desc', 'sortOrder:desc', 'id:desc']
            , 5
        );
        const [data1, data2, data3] = await Promise.all([p1,p2,p3]);

        const category = data1;
        const categoryModels = data2;
        if (categoryModels) {
            categoryModels.forEach(item => {
                filterCats.push(item.attributes.slug);
            });
        }
        promotionArticles = data3;
        articleModels = await getAllArticleModelByCats(filterCats,
            1,
            locale,
            ['isHome:desc', 'sortOrder:desc', 'id:desc']
        );

        initProps.seo = createSeoFromCategory(req, initProps.seo, null, category);
    } catch (e) {
        console.log(e);
        initProps = {};
    }

    return {
        props: {
            ...initProps,
            ...(await serverSideTranslations(locale, ['common'])),
            articleModels,
            filterCats,
            promotionArticles,
            locale
        },
    }
};