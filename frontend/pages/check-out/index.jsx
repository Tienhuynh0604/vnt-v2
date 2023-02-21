import React, {useEffect} from "react";
import {Button, Container, Form, Row, Col} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import DecorComponent from "../../components/DecorComponent";
import moment from "moment";
import {moneyFormat} from "../../ulti/helper";
import CheckoutForm from "../../components/form/CheckoutForm";
import {countryData} from "../../data/CountryData";

const Page = () => {
    const {checkOutItems, locale} = useAppContext();
    const {t} = useTranslation("common");

    console.log("Checkout", checkOutItems);

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

    const getOrders = () => {
        const products = [];
        checkOutItems.forEach(item => {
            const temp = item?.priceList.map(item2 => {
                return {
                    tourId: item.tour.id,
                    price_id: item2.priceId,
                    quantity: item2.quantity,
                    amount: item2.price,
                    usd_amount: item2.usdPrice
                }
            });
            products.push(...temp);
        });
        return products;
    };

    return <PageLayout title={t("co.t0")}>
        <Container className="check-out-section">
            <div>
                <h1><span className="text-capitalize">{t("payment")}</span></h1>
            </div>
            {checkOutItems?.length > 0 ?  (
                <CheckoutForm initialValue={{
                    order: getOrders()
                }}>
                    {(handleSubmit
                        , handleChange
                        , values
                        , touched
                        , isValid
                        , errors
                        , isSuccess
                        , loading
                        , isSubmitting
                        , handleBlur2) => (
                        <Row className="gy-3">
                            <Col xs={12} md={7}>
                                <h5 className="mt-3 text-capitalize fw-bold">{t("co.t1")}</h5>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="fullname">
                                            <Form.Label>{t("fullname")}</Form.Label>
                                            <Form.Control type="text"
                                                          placeholder={t("co.form1")}
                                                          name="fullname"
                                                          value={values.fullname}
                                                          onChange={handleChange}
                                                          onBlur={handleBlur2}
                                                          required
                                                          isInvalid={!!errors.fullname}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.fullname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>{t("email")}</Form.Label>
                                            <Form.Control name="email"
                                                          type="email"
                                                          placeholder={t("co.form2")}
                                                          value={values.email}
                                                          onChange={handleChange}
                                                          onBlur={handleBlur2}
                                                          required
                                                          isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="countryCode">
                                            <Form.Label>{t("country")}</Form.Label>
                                            <Form.Select name={"countryCode"}
                                                         value={values.countryCode}
                                                         placeholder={t("co.form4")}
                                                         onChange={handleChange}
                                                         onBlur={handleBlur2}
                                                         required
                                                         isInvalid={!!errors.countryCode}
                                            >
                                                {Object.keys(countryData).map((keyName) => {
                                                    return <option key={`country${keyName}`}
                                                                   value={countryData[keyName].code}>
                                                        {countryData[keyName].name}
                                                    </option>
                                                })}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.countryCode}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="phone">
                                            <Form.Label>{t("phone")}</Form.Label>
                                            <Form.Control name="phone"
                                                          type="text"
                                                          placeholder={t("co.form3")}
                                                          value={values.phone}
                                                          onChange={handleChange}
                                                          onBlur={handleBlur2}
                                                          required
                                                          isInvalid={!!errors.phone}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <h5 className="mt-3 text-capitalize fw-bold">{t("co.t2")}</h5>
                                        <div className="d-flex justify-content-between" style={{columnGap: "10px"}}>
                                            <div className="payment-item">
                                                <Form.Check
                                                    inline
                                                    onChange={handleChange}
                                                    onBlur={handleBlur2}
                                                    label={`${t("co.pw")} Paypal`}
                                                    value={"paypal"}
                                                    name="paymentType"
                                                    id={"p-i-paypal"}
                                                    type={"radio"}
                                                    isInvalid={!!errors.paymentType}
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
                                                    onChange={handleChange}
                                                    onBlur={handleBlur2}
                                                    value={"vnpay"}
                                                    label={`${t("co.pw")} Vnpay`}
                                                    name="paymentType"
                                                    id={"p-i-vnpay"}
                                                    type={"radio"}
                                                    isInvalid={!!errors.paymentType}
                                                />
                                                <Image src={"/images/payment/vnpay.png"}
                                                       alt={"Paypal"}
                                                       width={84}
                                                       height={20}
                                                       className=""
                                                />
                                            </div>
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.paymentType}
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Check
                                            inline
                                            label={<>{t("co.t3")} <a href={locale === "vi" ? "/vi/articles/dieu-kien-giao-dich" : "/articles/terms-and-conditions"}
                                                                        target={"_blank"}>{t("here")}</a></>}
                                            name="agreeWithTerm"
                                            className="mt-3"
                                            id={`agree-term`}
                                            type={"checkbox"}
                                            onChange={handleChange}
                                            onBlur={handleBlur2}
                                            value={true}
                                            isInvalid={!!errors.agreeWithTerm}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.agreeWithTerm}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={5} className="bg-grey p-3 p-xl-5 rounded-3">
                                <h5 className="text-capitalize">{t("co.t4")}</h5>
                                <hr className="text-grey"/>
                                {checkOutItems?.map((item, idx) => {
                                    return renderItem(item, idx)
                                })}
                                <hr className="text-grey dashed"/>
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
                                <hr className="text-grey "/>
                                <div className='product-item'>
                                    <div className="check-out-row">
                                        <span className="title text-black">{t("total")}</span>
                                        <span className="value text-danger">{moneyFormat(getSubTotal(), locale)}</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-5">
                                    <Button disabled={loading || checkOutItems.length === 0}
                                            type="submit"
                                            className="w-75 text-capitalize">
                                        {t('co.t5')}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    )}
                </CheckoutForm>
            ): <i>{t("co.no.item")}</i>}
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