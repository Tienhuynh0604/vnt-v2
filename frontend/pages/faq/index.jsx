import React, {useCallback, useEffect, useRef, useState} from "react";
import {Accordion, Container} from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import DecorComponent from "../../components/DecorComponent";
import {callGet} from "../../ulti/helper";
import AppPagination from "../../components/AppPagination";
import {createSimpleSeo} from "../../ulti/appUtil";
import {PATH_FAQ, PATH_NEWS} from "../../ulti/appConst";

const Page = ({model, query = {}}) => {
    const {t} = useTranslation("common");

    return <PageLayout title={t("faq")} breadcrumbs={[
        {
            title: t("faq"),
            link: "/faq"
        }
    ]}>
        <Container className="faq-section">
            <div className="d-flex justify-content-between">
                <h1><span className="text-uppercase">{t("faq")}</span></h1>
            </div>
            <div className="mt-4">
                <Accordion defaultActiveKey="0">
                    {model.data.map((item, idx) => (
                        <Accordion.Item key={`faq_${idx}`} eventKey={`faq_${idx}`}>
                            <Accordion.Header>{`Q. ${item.attributes.question}`}</Accordion.Header>
                            <Accordion.Body>
                                <div dangerouslySetInnerHTML={{
                                    __html: item.attributes.answer
                                }}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
                <div className='d-flex justify-content-end mt-3'>
                    <AppPagination {...model.meta.pagination} query={query} baseUrl={"/faq"}/>
                </div>
            </div>
        </Container>
        <DecorComponent/>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = 'en', query, req} = context;

    let model = {};
    let seoCustom = {};
    try {
        const res = await callGet("/faqs", {
            sortBy: ['id:desc'],
            pagination: {
                page: query.page ? query.page : 1,
                pageSize: query.pageSize ? query.pageSize : 20
            }
        }, locale);
        model = res;
        seoCustom = createSimpleSeo(req,
            `/${PATH_FAQ}`,
            "Vietnam Sightseeing - FAQ",
            locale);
    } catch (e) {
        console.error(e);
        model = {
            data: [],
            meta: {
                pagination: {
                    page: 1,
                    pageCount: 0
                }
            }
        }
    }

    return {
        props: {
            model,
            query,
            seoCustom,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};


export default Page;