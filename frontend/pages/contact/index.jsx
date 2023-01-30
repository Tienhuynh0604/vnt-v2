import React, {useCallback, useEffect, useRef, useState} from "react";
import {Form, Container, Col, Row, Button} from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import DecorComponent from "../../components/DecorComponent";
import {callGet} from "../../ulti/helper";

const Page = ({models = []}) => {
    const {t} = useTranslation("common");

    return <PageLayout title={t("contact")}
                       breadcrumbs={[
                           {
                               title: t("contact"),
                               link: "/contact"
                           }
                       ]}>
        <Container className="gallery-section">
            <div className="mt-4">
                <Row>
                    <Col xs={12} md={6}>
                        <h1><span className="text-capitalize">{t("contact")}</span></h1>
                        <p className="mt-4">
                            If you are at your holiday destination and have questions, please contact our local
                            operator.
                            You will find their contact information on your voucher.
                        </p>
                        <p>
                            <strong>Schedule:</strong>
                            Monday to Sunday 8:00 AM to 10:00 PM (local time)
                            <br/>
                            Phone Number:
                            <br/>
                            Hanoi: 1900 55 88 65
                            <br/>
                            Ha Long: 0842 55 88 65
                        </p>
                        <p>
                            <strong>Schedule:</strong>
                            <br/>
                            Hanoi: 51 Ly Thai To Street, Hoan Kiem Distric, Hanoi
                            <br/>
                            Ha Long: Sunworld Entrance, Bai Chay Ward, Ha Long City
                            <br/>
                        </p>
                        <p>
                            <strong>Email:</strong>
                            <br/>
                            For feedback and question: info@vn-sightseeing.com
                            <br/>
                            For booking: sales@vn-sightseeing.com
                        </p>
                        <p>
                            <strong>Group Booking Enquiries::</strong>
                            <br/>
                            For groups of 10 or more, there will be a discount, contact us for more information. Please
                            note that we cannot guarantee that the whole party will be able to board and take the tour
                            at the same time. Group discounts are only available for standard hop-on hop-off bus
                            tickets; combination tickets, attractions and other products are not eligible for group
                            discounts.
                        </p>

                        <p>
                            <strong>Our Head Office:</strong>
                            <br/>
                            43 Trang Tien, Hoan Kiem Distric, Hanoi
                        </p>
                        <p>
                            <strong>Working with us:</strong>
                            <br/>
                            There are many different ways of working with us, whether you would like to sell our
                            fantastic products as an agent or supply us with your products so we can collaborate a new
                            combo, the opportunities are there for you
                            <br/>
                        </p>
                        <p>
                            Please complete the contact form below and give us the information of the area that you are
                            interested, then one of our dedicated team will be in contact with you to discuss your
                            options
                        </p>
                    </Col>
                    <Col xs={12} md={6}>
                        <h1><span className="text-capitalize">{t("get in touch")}</span></h1>
                        <Form className="mt-4">
                            <Row>
                                <Col xs={12} md={12}>
                                    <Form.Group className="mb-3" controlId="formFullname">
                                        <Form.Label>Full name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your full name"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter your email"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your phone"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Form.Group className="mb-3" controlId="formMessage">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control as="textarea" rows={5} placeholder="Enter your message"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit" className="text-capitalize">
                                {t("send")}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Container>
        <DecorComponent/>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = 'en'} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};


export default Page;