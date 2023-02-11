import React from "react";
import {callGet, getImageUrl, imagePopulate, seoPopulate} from "../../ulti/helper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "react-i18next";
import PageLayout from "../../layouts/PageLayout";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {renderFillImage} from "../../ulti/appUtil";
import {Icon} from "@iconify/react";
import moment from "moment";
import Link from "next/link";
import {strapPagination} from "../../ulti/strapiHelper";
import DecorComponent from "../../components/DecorComponent";
import {PATH_NEWS} from "../../ulti/appConst";
import RecentPosts from "../../components/articles/RecentPost";
import RecentTours from "../../components/articles/RecentTours";
import SearchArticleForm from "../../components/form/SearchArticleForm";

const ArticleDetailPage = ({model, nModel, pModel}) => {
    const {t} = useTranslation("common");

    console.log(nModel, pModel);

    return <PageLayout className="pb-0"
                       title={model.attributes.title}
                       breadcrumbs={[
                           {
                               title: t("Articles"),
                               link: `/${PATH_NEWS}`
                           }
                       ]}
                       coverImage={getImageUrl(model?.attributes?.cover.data.attributes.url)}
    >
        <div className="position-relative">
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <div className="article-items">
                            <div className="cover">
                                {renderFillImage(model.attributes.cover)}
                            </div>
                            <hr/>
                            <div
                                className="date text-muted d-flex align-items-center">
                                <Icon icon={"material-symbols:calendar-month-outline-rounded"}
                                      className="me-2"/>
                                {moment(model.attributes.createdAt).format("Do, MMM YYYY")}
                            </div>
                            <hr/>
                            <h3>{model.attributes.title}</h3>
                            <div dangerouslySetInnerHTML={{
                                __html: model.attributes.content
                            }}/>
                        </div>
                        <div className="article-items">
                            <Row>
                                <Col xs={12} md={6}>
                                    {pModel && <div className="d-flex justify-content-start align-items-center"
                                                    style={{columnGap: "0.5rem"}}>
                                        <div className="img-warped">
                                            {renderFillImage(pModel.attributes.thumb)}
                                        </div>
                                        <div>
                                            <div className="text-muted">{t("previous")}</div>
                                            <Link href={`/${PATH_NEWS}/${pModel.attributes.slug}`}>
                                                <h3 className='line-2br'>{pModel.attributes.title}</h3>
                                            </Link>
                                        </div>
                                    </div>}
                                </Col>
                                <Col xs={12} md={6}>
                                    {nModel && <div className="d-flex justify-content-end align-items-center"
                                                    style={{columnGap: "0.5rem"}}>
                                        <div>
                                            <div className="text-end text-muted">{t("next")}</div>
                                            <Link href={`/${PATH_NEWS}/${nModel.attributes.slug}`}>
                                                <h3 className='text-end line-2br'>{nModel.attributes.title}</h3>
                                            </Link>
                                        </div>
                                        <div className="img-warped">
                                            {renderFillImage(nModel.attributes.thumb)}
                                        </div>
                                    </div>}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <SearchArticleForm>
                            {(handleSubmit, handleChange, values, touched, isValid, errors, isSuccess, loading, isSubmitting, handleBlur2) => (
                                <Form.Group className="mb-3" controlId="formSearch">
                                    <Form.Control name="s"
                                                  type="text"
                                                  value={values.s}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur2}
                                                  required
                                                  size="sm"
                                                  isInvalid={!!errors.s}
                                                  placeholder={t("form.search.article")}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.s}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        </SearchArticleForm>
                        <hr/>
                        <div>
                            <h2 className="h2-title text-capitalize">{t("articles.recentTours")}</h2>
                            <div className="mb-3"/>
                            <RecentTours/>
                        </div>
                        <hr/>
                        <div>
                            <h2 className="h2-title text-capitalize">
                                {t("articles.recentPosts")}
                            </h2>
                            <div className="mb-3"/>
                            <RecentPosts exceptId={model.id}/>
                        </div>
                    </Col>
                </Row>
            </Container>
            <DecorComponent/>
        </div>
    </PageLayout>
};

export default ArticleDetailPage;

export const getServerSideProps = async (context) => {
    const {locale, query, req} = context;
    const {slug} = query;
    console.log(`Article slug: `, slug, locale);
    let model = null;
    let nModel = null;
    let pModel = null;
    try {
        const res = await callGet("/articles", {
            filters: {
                slug
            },
            populate: {
                cover: imagePopulate(),
                seo: seoPopulate(),
            },
            pagination: {
                pageSize: 1
            }
        }, locale, true);

        model = res.data[0];

        const p1 = callGet('/articles', {
            fields: ["title", 'slug', 'shortDescription'],
            filters: {
                id: {
                    $gt: model.id
                }
            },
            populate: {
                thumb: imagePopulate(),
            },
            pagination: {
                pageSize: 1
            }
        }, locale, true);

        const p2 = callGet('/articles', {
            fields: ["title", 'slug', 'shortDescription'],
            filters: {
                id: {
                    $lt: model.id
                }
            },
            populate: {
                thumb: imagePopulate(),
            },
            pagination: {
                pageSize: 1
            }
        }, locale, true);

        const [nextModel, preModel] = await Promise.all([p1, p2]);
        console.log("Next articles: ", nextModel.data, preModel.data);
        nModel = nextModel.data[0] || null;
        pModel = preModel.data[0] || null;

    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            model,
            nModel,
            pModel,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};