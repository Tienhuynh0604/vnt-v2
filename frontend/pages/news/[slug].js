import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect, useState} from "react";
import {
    initialProps,
} from "../../ulti/helper";
import {Container, Row, Col} from "react-bootstrap";
import BreadcrumbWidget from "../../components/widget/BreadcrumbWidget";
import NavigateSideBarWidget from "../../components/widget/NavigateSideBarWidget";
import FaqFormWidget from "../../components/widget/FaqFormWidget";
import TopServiceWidget from "../../components/widget/TopServiceWidget";
import VideoWidget from "../../components/widget/VideoWidget";
import AdWidget from "../../components/widget/AdWidget";
import Error from "../_error";
import {getArticleModels} from "../../services/ArticleService";
import {getSingleCategory} from "../../services/CategoryService";
import ListServiceArticles from "../../components/article/ListServiceArticles";
import {CATEGORY_NEWS} from "../../ulti/appConst";
import {createSeoFromCategory} from "../../ulti/appUtil";

const basePath = `/${CATEGORY_NEWS}`;
const baseName = "Tin tức";

const Index = (props) => {

    const {
        model, slug, category, locale
    } = props;

    if (!category) {
        return <Error statusCode={404}/>
    }

    return (
        <Container fluid className="article-section">
            <Container className="py-5">
                <Row>
                    <Col xs={12} md={8}>
                        <BreadcrumbWidget title={""}
                                          categories={[{
                                              name: baseName,
                                              path: basePath
                                          }]}
                                          className={"mb-4"}/>
                        <h2 className="title mb-4">{category.attributes.name}</h2>
                        <ListServiceArticles model={model}
                                             locale={locale}
                                             basePath={basePath}
                                             category={category}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <NavigateSideBarWidget className="mb-4"/>
                        <FaqFormWidget className="mb-4"/>
                        <TopServiceWidget className="mb-4"/>
                        <VideoWidget className="mb-4"/>
                        <AdWidget/>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
};

export default Index;

export const getServerSideProps = async (context) => {
    const {locale = "vi", query, req} = context;
    const {slug} = query;

    let initProps = {};
    let model = {
        data: [],
        meta: {
            page: 1,
            pageCount: 1
        }
    };
    let category = null;

    try {
        initProps = await initialProps(context);
        const p1 = getArticleModels(slug, 1, locale);
        const p2 = getSingleCategory(slug);
        const [data1, data2] = await Promise.all([p1, p2]);
        model = data1;
        category = data2;
        initProps.seo = createSeoFromCategory(req, initProps.seo, basePath, category);
    } catch (e) {
        initProps = {};
    }

    return {
        props: {
            ...initProps,
            ...(await serverSideTranslations(locale, ['common'])),
            model,
            slug,
            locale,
            category
        },
    }
};