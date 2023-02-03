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

const ArticleDetailPage = ({model}) => {
    const {t} = useTranslation("common");

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
                        <div className="article-item">
                            <div className="cover">
                                {renderFillImage(model.attributes.thumb)}
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
                        <div className="article-item">

                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formFullname">
                                <Form.Control type="text" placeholder="Search article ..."/>
                            </Form.Group>
                        </Form>
                        <hr/>
                        <h2 className="h2-title text-capitalize">{t("Recent tour")}</h2>
                        <hr/>
                        <h2 className="h2-title text-capitalize">{t("Recent post")}</h2>
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
    let articles = [];
    let tours = [];
    try {
        const res = await callGet("/articles", {
            filters: {
                slug
            },
            populate: {
                thumb: imagePopulate(),
                cover: imagePopulate(),
                seo: seoPopulate(),
            },
            pagination: {
                pageSize: 1
            }
        }, locale, true);

        model = res.data[0];

    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            model,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};