import React, {} from "react";
import {Form, Container, Col, Row, Button, Alert} from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import DecorComponent from "../../components/DecorComponent";
import {useAppContext} from "../../layouts/AppLayout";
import ContactForm from "../../components/form/ContactForm";

const Page = ({models = []}) => {
    const {t} = useTranslation("common");
    const {common = {}} = useAppContext();

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
                            {t("contact.t1")}
                        </p>
                        <p>
                            <strong>{t("schedule")}:</strong> {t("contact.worktime")}
                            <br/>
                            {t("phone")}:
                            <br/>
                            Hanoi: 1900 55 88 65
                            <br/>
                            Ha Long: 0842 55 88 65
                        </p>
                        <p>
                            <strong>{t("address")}:</strong>
                            <br/>
                            Hanoi: 51 Ly Thai To Street, Hoan Kiem Distric, Hanoi
                            <br/>
                            Ha Long: Sunworld Entrance, Bai Chay Ward, Ha Long City
                            <br/>
                        </p>
                        <p>
                            <strong>{t("email")}:</strong>
                            <br/>
                            {t("contact.faq")}: info@vn-sightseeing.com
                            <br/>
                            {t("contact.booking")}: sales@vn-sightseeing.com
                        </p>
                        <p>
                            <strong>{t("contact.gbe")}:</strong>
                            <br/>
                            {t("contact.t4")}
                        </p>

                        <p>
                            <strong>{t("contact.hq")}:</strong>
                            <br/>
                            {common.address}
                        </p>
                        <p>
                            <strong>{t("contact.wwu")}:</strong>
                            <br/>
                            {t("contact.t5")}
                            <br/>
                        </p>
                        <p>
                            {t("contact.t6")}
                        </p>
                    </Col>
                    <Col xs={12} md={6}>
                        <h1><span className="text-capitalize">{t("contact.git")}</span></h1>
                        <div className="mb-3"/>
                        <ContactForm>
                            {(handleSubmit, handleChange, values, touched, isValid, errors, isSuccess, loading, isSubmitting, handleBlur2) => (
                                <Row>
                                    <Col xs={12} md={12}>
                                        <Form.Group className="mb-3" controlId="formFullname">
                                            <Form.Label>{t("fullname")}</Form.Label>
                                            <Form.Control name="fullname"
                                                          value={values.fullname}
                                                          onChange={handleChange}
                                                          onBlur={handleBlur2}
                                                          required
                                                          size="sm"
                                                          type="text"
                                                          isInvalid={!!errors.fullname}
                                                          placeholder={`${t("form.plh1")} ${t("fullname")}`}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.fullname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label>{t("email")}</Form.Label>
                                            <Form.Control name="email"
                                                          value={values.email}
                                                          onChange={handleChange}
                                                          onBlur={handleBlur2}
                                                          required
                                                          size="sm"
                                                          type="text"
                                                          isInvalid={!!errors.email}
                                                          placeholder={`${t("form.plh1")} ${t("email")}`}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="formPhone">
                                            <Form.Label>{t("phone")}</Form.Label>
                                            <Form.Control name={"phone"}
                                                          value={values.phone}
                                                          onChange={handleChange}
                                                          onBlur={handleBlur2}
                                                          required
                                                          size="sm"
                                                          type="text"
                                                          isInvalid={!!errors.phone}
                                                          placeholder={`${t("form.plh1")} ${t("phone")}`}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group className="mb-3" controlId="formMessage">
                                            <Form.Label>Message</Form.Label>
                                            <Form.Control name="message"
                                                          as="textarea"
                                                          rows={5}
                                                          value={values.message}
                                                          onChange={handleChange}
                                                          onBlur={handleBlur2}
                                                          required size="sm"
                                                          type="text"
                                                          isInvalid={!!errors.message}
                                                          placeholder={`${t("form.plh1")} ${t("message")}`}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.message}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        {!isSuccess ? <Button disabled={loading}
                                                              variant="primary"
                                                              type="submit"
                                                              className="text-capitalize">
                                                {t("send")}
                                            </Button>
                                            : (<Alert key="success" variant="success">
                                                {t("thanks.t1")}
                                            </Alert>)
                                        }
                                    </Col>
                                </Row>
                            )}
                        </ContactForm>
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