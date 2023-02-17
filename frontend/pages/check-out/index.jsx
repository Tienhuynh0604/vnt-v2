import React, { useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../layouts/AppLayout";
import PageLayout from "../../layouts/PageLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import DecorComponent from "../../components/DecorComponent";
import moment from "moment";
import { moneyFormat } from "../../ulti/helper";
import PhoneCode from 'react-phone-code';

const Page = () => {
    const { checkOutItems, locale } = useAppContext();
    const { t } = useTranslation("common");

    console.log("Checkout", checkOutItems);

    useEffect(() => {

    }, [checkOutItems]);

    const renderItem = (item, idx) => {
        return <div className='product-item' key={`pi${idx}`}>
            <h6 className="fw-bold">{item.tour.attributes.title}</h6>
            <div className="check-out-row">
                <span className="title">{t("date")}</span>
                <span className="value">{moment().format("DD/MM/YYYY")}</span>
            </div>
            <div className="check-out-row">
                <span className="title">{t("ticket type")}</span>
                <span className="value">{item.itemAttrs.join(" ")}</span>
            </div>
            <div className="check-out-row">
                <span className="title">{t("quantity")}</span>
            </div>
            {item.priceList.map(pl => {
                return <div className="check-out-row">
                    <span className="title">- {t(`ageGroup${pl.ageGroup}`)}</span>
                    <span className="value">
                        {pl.quantity} x {moneyFormat(locale === "en" ? pl.usdPrice : pl.price, locale)}
                    </span>
                </div>
            })}
        </div>
    };

    const getSubTotal = () => {
        let total = 0;
        checkOutItems.map(item => {
            let childTotal = 0;
            item.priceList.map(item2 => {
                childTotal += (locale === 'en' ? item2.usdPrice : item2.price) * item2.quantity;
            });
            total += childTotal;
        });
        return total;
    };

    return <PageLayout>
        <Container className="check-out-section">
            <div>
                <h1><span className="text-capitalize">{t("payment")}</span></h1>
            </div>
            <Row className="gy-3">
                <Col xs={12} md={7}>
                    <h5 className="mt-3 text-capitalize fw-bold">{t("co.t1")}</h5>
                    <Form className="text-capitalize">
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="fullname">
                                    <Form.Label>{t("fullname")}</Form.Label>
                                    <Form.Control type="text" placeholder={t("co.form1")} />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>{t("email")}</Form.Label>
                                    <Form.Control type="email" placeholder={t("co.form2")} />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>{t("country")}</Form.Label>
                                    <PhoneCode
                                        onSelect={code => console.log(code)} // required
                                        showFirst={['US', 'VN', 'CN', 'KR', 'RU', 'JP']}
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>{t("phone")}</Form.Label>
                                    <Form.Control type="text" placeholder={t("co.form3")} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <h5 className="mt-3 text-capitalize fw-bold">{t("co.t2")}</h5>
                                <div className="d-flex justify-content-between" style={{ columnGap: "10px" }}>
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
                                    label={`${t("co.t3")}`}
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
                    <h5 className="text-capitalize">{t("co.t4")}</h5>
                    <hr className="text-grey" />
                    {checkOutItems?.map((item, idx) => {
                        return renderItem(item, idx)
                    })}
                    <hr className="text-grey dashed" />
                    <div className='product-item'>
                        <div className="check-out-row">
                            <span className="title">{t("subtotal")}</span>
                            <span className="value">{moneyFormat(getSubTotal(), locale)}</span>
                        </div>
                        <div className="check-out-row">
                            <span className="title">{t("discount")}</span>
                            <span className="value">0.00 $</span>
                        </div>
                        <div className="check-out-row">
                            <span className="title">{t("taxes&fees")}</span>
                            <span className="value">0.00 $</span>
                        </div>

                    </div>
                    <hr className="text-grey " />
                    <div className='product-item'>
                        <div className="check-out-row">
                            <span className="title text-black">{t("total")}</span>
                            <span className="value text-danger">{moneyFormat(getSubTotal(), locale)}</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <Button className="w-75 text-capitalize">{t('co.t5')}</Button>
                    </div>
                </Col>
            </Row>
        </Container>
        <DecorComponent />
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const { locale = 'en' } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};


export default Page;