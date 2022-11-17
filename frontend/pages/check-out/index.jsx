import React from "react";
import {Button, Container, Table, Form, Row, Col} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import InputNumberPlusMinus from "../../components/booking/InputNumberPlusMinus";
import {Icon} from "@iconify/react";
import DecorComponent from "../../components/DecorComponent";

const Page = () => {
    const {carts = [], setCarts} = useAppContext();
    const {t} = useTranslation("common");

    return <PageLayout>
        <Container className="check-out-section">
            <div>
                <h1><span className="text-capitalize">{t("payment")}</span></h1>
            </div>
            <Row className="gy-3">
                <Col xs={12} md={7}>
                    <h5 className="mt-5 text-capitalize fw-bold">{t("booking information")}</h5>
                    <Form className="text-capitalize">
                        <Row>
                            <Col xs={12}>
                                <Form.Group className="mb-3" controlId="fullname">
                                    <Form.Label>{t("fullname")}</Form.Label>
                                    <Form.Control type="text" placeholder={t("your fullname here")}/>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>{t("email")}</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com"/>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>{t("phone number")}</Form.Label>
                                    <Form.Control type="email" placeholder={t("your phone here")}/>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <h5 className="mt-3 text-capitalize fw-bold">{t("Choose payment options")}</h5>
                                <div className="d-flex justify-content-between" style={{columnGap: "10px"}}>
                                    <div className="payment-item">
                                        <Form.Check
                                            inline
                                            label={`${t("pay with")} Paypal`}
                                            name="group1"
                                            id={"p-i-paypal"}
                                            type={"radio"}
                                        />
                                        <Image src={"/images/payment/paypal.png"}
                                               alt={"Paypal"}
                                               width={75}
                                               height={20}
                                               className=""
                                        />
                                    </div>
                                    <div className="payment-item">
                                        <Form.Check
                                            inline
                                            label={`${t("pay with")} Vnpay`}
                                            name="group1"
                                            id={"p-i-vnpay"}
                                            type={"radio"}
                                        />
                                        <Image src={"/images/payment/vnpay.png"}
                                               alt={"Paypal"}
                                               width={84}
                                               height={20}
                                               className=""
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <Form.Check
                                    inline
                                    label={`${t("agree with term")}`}
                                    name="agree"
                                    className="mt-3"
                                    id={`agree-term`}
                                    type={"checkbox"}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={12} md={5} className="bg-grey p-3 p-xl-5 rounded-3">
                    <h5 className="text-capitalize">{t("booking summary")}</h5>
                    <hr className="text-grey"/>
                    <div className='product-item'>
                        <h6 className="fw-bold">Ha Noi Double - Decker Bus</h6>
                        <div className="check-out-row">
                            <span className="title">{t("date")}</span>
                            <span className="value">30/10/2022</span>
                        </div>
                        <div className="check-out-row">
                            <span className="title">{t("ticket type")}</span>
                            <span className="value">24 hours</span>
                        </div>
                        <div className="check-out-row">
                            <span className="title">{t("quantity")}</span>
                        </div>
                        <div className="check-out-row">
                            <span className="title">- {t("adult")}</span>
                            <span className="value">1 x $23.00</span>
                        </div>
                        <div className="check-out-row">
                            <span className="title">- {t("child")}</span>
                            <span className="value">2 x $23.00</span>
                        </div>
                    </div>
                    <hr className="text-grey dashed"/>
                    <div className='product-item'>
                        <div className="check-out-row">
                            <span className="title">{t("subtotal")}</span>
                            <span className="value">$60.00</span>
                        </div>
                        <div className="check-out-row">
                            <span className="title">{t("discount")}</span>
                            <span className="value">$00.00</span>
                        </div>
                        <div className="check-out-row">
                            <span className="title">{t("taxes&fees")}</span>
                            <span className="value">$00.00</span>
                        </div>

                    </div>
                    <hr className="text-grey "/>
                    <div className='product-item'>
                        <div className="check-out-row">
                            <span className="title text-black">{t("total")}</span>
                            <span className="value text-danger">$60.00</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <Button className="w-75 text-capitalize">{t('make payment')}</Button>
                    </div>
                </Col>
            </Row>
        </Container>
        <DecorComponent/>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = 'vi'} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};


export default Page;