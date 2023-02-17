import React, { } from "react";
import { Form, Container, Col, Row, Button, Alert } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import DecorComponent from "../../components/DecorComponent";
import { useAppContext } from "../../layouts/AppLayout";
import ContactForm from "../../components/form/ContactForm";
import { renderContactItem } from "../../ulti/appUtil";
import Link from "next/link";

const Page = ({ models = [] }) => {
    const { t } = useTranslation("common");
    const { common = {}, destinations = [], locale } = useAppContext();

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
                        </p>
                        {destinations?.map((currentDes, idx) => {
                            return <p key={`contact_${idx}`}>
                                <strong>{locale === "vi" ? currentDes.attributes.name : currentDes.attributes.name_en}</strong>
                                {currentDes.attributes.contacts?.map((item, idx) => {
                                    return <div>
                                        {renderContactItem(item, `dc_${idx}`
                                            , true
                                            , {
                                                style: {
                                                    fontSize: "1rem",
                                                    marginRight: "0.5rem"
                                                }
                                            })}
                                    </div>
                                })}
                            </p>
                        })}
                        <p>
                            <strong>{t("email")}:</strong>
                            <br />
                            {t("contact.faq")}: <Link href="mailto:info@vn-sightseeing.com">info@vn-sightseeing.com</Link>
                            <br />
                            {t("contact.booking")}: {renderContactItem(common.email)}
                        </p>
                        <p>
                            <strong>{t("contact.gbe")}:</strong>
                            <br />
                            {t("contact.t4")}
                        </p>

                        <p>
                            <strong>{t("contact.hq")}:</strong>
                            <br />
                            {common.address}
                        </p>
                        <p>
                            <strong>{t("contact.wwu")}:</strong>
                            <br />
                            {t("contact.t5")}
                            <br />
                        </p>
                        <p>
                            {t("contact.t6")}
                        </p>
                    </Col>
                    <Col xs={12} md={6}>
                        <h1><span className="text-capitalize">{t("contact.git")}</span></h1>
                        <div className="mb-3" />
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