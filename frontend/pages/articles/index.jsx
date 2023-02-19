import React, {createRef} from "react";
import PageLayout from "../../layouts/PageLayout";
import {callGet, getImageUrl, imagePopulate, seoPopulate} from "../../ulti/helper";
import {Container} from "react-bootstrap";
import DecorComponent from "../../components/DecorComponent";
import {Row, Col, Button, Form} from "react-bootstrap";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import moment from "moment";
import Link from "next/link";
import {createSimpleSeo, renderFillImage, renderImage} from "../../ulti/appUtil";
import {Icon} from '@iconify/react';
import {strapPagination} from "../../ulti/strapiHelper";
import {PATH_CONTACT, PATH_NEWS} from "../../ulti/appConst";
import RecentTours from "../../components/articles/RecentTours";
import RecentPosts from "../../components/articles/RecentPost";
import SearchArticleForm from "../../components/form/SearchArticleForm";

const Index = ({articles, articlesPagination, query}) => {
    const {t} = useTranslation("common");
    return <PageLayout className="pb-0" title="News">
        <div className="position-relative">
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        {articles.map((item, idx) => {
                            return (
                                <div className="article-items" key={`a${idx}`}>
                                    <div className="cover">
                                        {renderFillImage(item.attributes.cover)}
                                    </div>
                                    <hr/>
                                    <div
                                        className="date text-muted d-flex align-items-center">
                                        <Icon icon={"material-symbols:calendar-month-outline-rounded"}
                                              className="me-2"/>
                                        {moment(item.attributes.createdAt).format("Do, MMM YYYY")}
                                    </div>
                                    <hr/>
                                    <Link href={`/${PATH_NEWS}/${item.attributes.slug}`}>
                                        <h2>{item.attributes.title}</h2>
                                    </Link>
                                    <p>
                                        {item.attributes.shortDescription}
                                    </p>
                                    <Link href={`/${PATH_NEWS}/${item.attributes.slug}`}>
                                        <Button variant="primary">{t("Read more")}</Button>
                                    </Link>
                                </div>
                            )
                        })}
                        {strapPagination(`${PATH_NEWS}`, articlesPagination, query)}
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
                            <RecentPosts exceptId={null}/>
                        </div>
                    </Col>
                </Row>
            </Container>
            <DecorComponent/>
        </div>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale, query, req} = context;
    const {s = null, page = 1} = query;
    let articles = [];
    let seoCustom = {};
    let articlesPagination = {
        page,
        pageSize: 12
    };
    try {
        const res2 = await callGet("/articles", {
            fields: ['title', 'slug', 'shortDescription'],
            // filters: {
            //     destination: {
            //         slug,
            //     },
            // },
            populate: {
                thumb: imagePopulate(),
                cover: imagePopulate()
            },
            sort: ["id:desc"],
            pagination: articlesPagination
        });
        articles = res2.data;
        seoCustom = createSimpleSeo(req,
            `/${PATH_NEWS}`,
            "Vietnam Sightseeing - News",
            locale);
    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            articles,
            articlesPagination,
            query,
            seoCustom,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};

export default Index;