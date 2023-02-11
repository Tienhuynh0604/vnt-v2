import React, {memo, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Col, Form, Row, Tab, Table, Tabs} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import {toast} from "react-toastify";
import {Icon} from "@iconify/react";
import {renderContactItem} from "../../ulti/appUtil";
import ContactForm from "../form/ContactForm";

const ContactUsStep = ({productName, destinationId}) => {
    const {t} = useTranslation("common");
    const [selectedTab, setSelectedTab] = useState("contact-us");
    const [destination, setDestination] = useState(null);
    const {common, setBookingModal, destinations} = useAppContext();

    useEffect(() => {
        const idx = destinations.findIndex(
            item => item.id === destinationId
        );
        if (idx >= 0) {
            setDestination(destinations[idx]);
        }
    }, [destinationId]);

    const onSendContact = () => {
        setBookingModal({
            isVisible: false,
        });
        toast(t("Đăng ký thông tin thành công"));
    };

    const onCancel = () => {
        setBookingModal({
            isVisible: false,
        });
    };

    return <Tabs
        defaultActiveKey={selectedTab}
        activeKey={selectedTab}
        onSelect={tab => setSelectedTab(tab)}
        justify
        id="modal-booking"
        className="mb-3"
    >
        <Tab eventKey="contact-us" title={<>{t("Contact us")}</>}>
            <Row className="m-4" style={{rowGap: "1rem"}}>
                <Col xs={12} md={4}>
                    <div className='booking-contact'>
                        <div className='booking-contact-item mb-3'>
                            <div className='bci-svg'>
                                <Icon height={"100%"} icon="material-symbols:location-on-outline"/>
                            </div>
                            <strong>{t("Địa chỉ")}</strong>
                            <br/>
                            <span>{common.address}</span>
                        </div>
                        <div className='booking-contact-item mb-3'>
                            <div className='bci-svg'>
                                <Icon height={"100%"} icon="material-symbols:phone-in-talk-outline"/>
                            </div>
                            <strong>{t("Hotline")}</strong>
                            <br/>
                            <span>{common?.phone?.displayText}</span>
                        </div>
                        <div className='booking-contact-item'>
                            <div className='bci-svg'>
                                <Icon height={"100%"} icon="material-symbols:mark-email-read-outline-rounded"/>
                            </div>
                            <strong>{t("Email")}</strong>
                            <br/>
                            <span>{common?.email?.displayText}</span>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={8}>
                    <h5 className=''>
                        {t("contact.t1")}
                        <br/>
                        <small className="text-muted" style={{fontSize: "13px"}}>
                            {t("contact.t2")}
                        </small>
                        {destination ? (
                            <div className="d-flex align-items-center justify-content-start">
                                <strong style={{fontSize: "1rem", marginRight: "0.5rem"}}>
                                    {t("contactUs")}:
                                </strong>
                                {destination.attributes.contacts?.map((item, idx) => {
                                    return renderContactItem(item, `dc_${idx}`
                                        , false
                                        , {
                                            style: {
                                                fontSize: "1.5rem",
                                                marginRight: "0.5rem"
                                            }
                                        })
                                })}
                            </div>
                        ) : ""}
                    </h5>
                    <ContactForm className="mt-2" initialValue={
                        {
                            message: `${t("form.contact.product")} "${productName}"`
                        }
                    }>
                        {(handleSubmit, handleChange, values, touched, isValid, errors, isSuccess, loading, isSubmitting, handleBlur2) => (
                            <Row style={{rowGap: "0.5rem"}}>
                                <Col xs={12} md={12}>
                                    <Form.Group className="" controlId="formFullname">
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
                                </Col>
                                <Col xs={12} md={6}>
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
                                </Col>
                                <Col xs={12}>
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
                                </Col>
                                <Col xs={12} className="d-flex justify-content-end">
                                    <Button variant="secondary"
                                            onClick={() => onCancel()}
                                            className="text-capitalize me-3">
                                        {t("Cancel")}
                                    </Button>
                                    <Button variant="primary"
                                            type="submit" className="text-capitalize">
                                        {t("send")}
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </ContactForm>
                </Col>
            </Row>

        </Tab>
    </Tabs>
};


export default memo(ContactUsStep);