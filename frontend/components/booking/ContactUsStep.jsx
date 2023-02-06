import React, {memo, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Col, Form, Row, Tab, Table, Tabs} from "react-bootstrap";
import Link from "next/link";
import {useAppContext} from "../../layouts/AppLayout";
import {toast} from "react-toastify";
import {Icon} from "@iconify/react";

const ContactUsStep = ({productName}) => {
    const {t} = useTranslation("common");
    const [selectedTab, setSelectedTab] = useState("contact-us");
    const {common, setBookingModal} = useAppContext();

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
                        {t("Liên hệ ngay với chúng tôi")}
                        <br/>
                        <small className="text-muted" style={{fontSize: "13px"}}>
                            Bạn cần giải đáp thắc mắc, hoặc tìm hiểu thêm về các tour du lịch của chúng tôi. Bạn có thể
                            liên hệ với chúng tôi ở đây. Chúng rất vui lòng được hỗ trợ bạn
                        </small>
                    </h5>
                    <Form className="mt-2" onSubmit={() => onSendContact()}>
                        <Row>
                            <Col xs={12} md={12}>
                                <Form.Group className="mb-3" controlId="formFullname">
                                    <Form.Control type="text" placeholder={t("Nhập Họ và tên")}/>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Control type="email" placeholder={t("Nhập email")}/>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Control type="text" placeholder={t("Nhập số điện thoại")}/>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group className="mb-3" controlId="formMessage">
                                    <Form.Control as="textarea"
                                                  rows={5}
                                                  value={`Tôi muốn tìm hiểu thông tin về sản phẩm "${productName}"`}
                                                  placeholder={t("Nhập nội dung")}/>
                                </Form.Group>
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
                    </Form>
                </Col>
            </Row>

        </Tab>
    </Tabs>
};


export default memo(ContactUsStep);