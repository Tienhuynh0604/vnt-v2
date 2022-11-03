import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect, useState} from "react";
import {callGet, fixUrlStrapiContentImg, imagePopulate, initialProps, seoPopulate} from "../../ulti/helper";
import {Container, Row, Col} from "react-bootstrap";
import BreadcrumbWidget from "../../components/widget/BreadcrumbWidget";
import Error from "../_error";
import ShowMoreContent from "../../components/widget/ShowMoreContent";
import WhyChooseWidget from "../../components/widget/WhyChooseWidget";
import AppointmentHorizonForm from "../../components/widget/AppointmentHorizonForm";
import RelatedArticle from "../../components/article/RelatedArticle";
import NavigateSideBarWidget from "../../components/widget/NavigateSideBarWidget";
import FaqFormWidget from "../../components/widget/FaqFormWidget";
import TopServiceWidget from "../../components/widget/TopServiceWidget";
import VideoWidget from "../../components/widget/VideoWidget";
import AdWidget from "../../components/widget/AdWidget";
import {CATEGORY_NEWS} from "../../ulti/appConst";
import {getSingleArticle} from "../../services/ArticleService";
import {createSeoFromArticle} from "../../ulti/appUtil";

const basePath = `/${CATEGORY_NEWS}`;
const baseName = "Tin tức";

const Index = (props) => {

    const {model, locale} = props;
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (model) {
            setContent(fixUrlStrapiContentImg(model.content));
        }
    }, [model]);

    if (!model) {
        return <Error statusCode={404}/>;
    }

    const getBreadcrumbArr = () => {
        let ret = [
            {
                name: baseName,
                path: basePath
            },
        ];

        if (model && model.categories && model.categories.data.length > 0) {
            ret.push({
                name: model.categories.data[0].attributes.name,
                path: `${basePath}/${model.categories.data[0].attributes.slug}`
            });
        }

        return ret;
    };

    return (
        <Container fluid className="article-section">
            <Container className="py-5">
                <Row>
                    <Col xs={12} md={8}>
                        <BreadcrumbWidget title={model.title}
                                          categories={getBreadcrumbArr()}
                                          className={"mb-4"}/>
                        <h2 className="title mb-4">{model.title}</h2>
                        <ShowMoreContent content={<div className={"ck-content"}>
                            {content}
                        </div>}/>
                        <WhyChooseWidget className="pb-4"/>
                        <AppointmentHorizonForm className="pb-4"/>
                        <RelatedArticle className="pb-4"/>
                    </Col>
                    <Col xs={12} md={4}>
                        <NavigateSideBarWidget className="mb-4"/>
                        <FaqFormWidget className="mb-4" locale={locale}/>
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
    const [param1, param2] = slug;

    let initProps = {};
    let model = null;

    try {
        initProps = await initialProps(context);
        model = await getSingleArticle(param2, locale);
        initProps.seo = createSeoFromArticle(req, initProps.seo, basePath, model);
    } catch (e) {
        initProps = {};
    }

    return {
        props: {
            ...initProps,
            ...(await serverSideTranslations(locale, ['common'])),
            model,
            locale,
            slug
        },
    }
};