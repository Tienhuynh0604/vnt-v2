import React, {useCallback, useEffect, useRef, useState} from "react";
import {Accordion, Container} from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import DecorComponent from "../../components/DecorComponent";
import {callGet} from "../../ulti/helper";

const Page = ({models = []}) => {
    const {t} = useTranslation("common");
    const [faqs, setFaqs] = useState(models);

    return <PageLayout>
        <Container className="gallery-section">
            <div className="d-flex justify-content-between">
                <h1><span className="text-uppercase">{t("faq")}</span></h1>
            </div>
            <div className="mt-4">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><span>Q.</span> Can I cancel my tickets?</Accordion.Header>
                        <Accordion.Body>
                            <span>A.</span> Hop-on hop-off tickets can be cancelled up to 24 hours before the date selected at the time
                            of purchase. If you request a refund less than 24 hours before the date stated on your
                            voucher, you will not be entitled to a refund.
                            Combination tickets cannot be cancelled. All sales are final. A combination ticket is a
                            ticket that includes a hop-on hop-off bus and other product, as well as an entry ticket to a
                            local attraction or tour.
                            Attractions can be cancelled depending on the cancellation policy stipulated by each
                            attraction.We are not responsible if an attraction does not give refunds if a customer is
                            not able to use the ticket. Please check an attraction’s cancellation policy before making
                            the request.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><span>Q.</span> Can I cancel my tickets?</Accordion.Header>
                        <Accordion.Body>
                            <span>A.</span> Hop-on hop-off tickets can be cancelled up to 24 hours before the date selected at the time
                            of purchase. If you request a refund less than 24 hours before the date stated on your
                            voucher, you will not be entitled to a refund.
                            Combination tickets cannot be cancelled. All sales are final. A combination ticket is a
                            ticket that includes a hop-on hop-off bus and other product, as well as an entry ticket to a
                            local attraction or tour.
                            Attractions can be cancelled depending on the cancellation policy stipulated by each
                            attraction.We are not responsible if an attraction does not give refunds if a customer is
                            not able to use the ticket. Please check an attraction’s cancellation policy before making
                            the request.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </Container>
        <DecorComponent/>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = 'vi'} = context;

    let models = [];
    try {
        const res = await callGet("/faqs", {
            sortBy: ['id:desc'],
        });
        models = res.data;
    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            models,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};


export default Page;