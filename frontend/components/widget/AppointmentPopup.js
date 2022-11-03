import React, {memo, useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form, InputGroup, Alert} from "react-bootstrap";
import Image from "next/image";
import NewsletterForm from "../NewsletterForm";
import {Icon} from "@iconify/react";

const AppointmentPopup = (props) => {
    const popupTimeKey = 'mainPopupTime';
    const ISSERVER = typeof window === "undefined";

    let popupTime = null;
    if (!ISSERVER) {
        popupTime = localStorage.getItem(popupTimeKey) ? localStorage.getItem(popupTimeKey) : null;
    }
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        let today = Math.floor((new Date()).getTime() / 1000);
        let isShow = false;
        if (popupTime) {
            let lastTime = parseInt(popupTime);
            if ((today - lastTime) / (3600) >= 1) {
                isShow = true;
            }
        } else {
            isShow = true;
        }
        if (true) {
            localStorage.setItem(popupTimeKey, `${today}`);
            setShowPopup(true);
        }
    }, [popupTime]);

    const topics = [
        'Thông tin chung',
        'Cơ xương khớp',
        'Thần kinh cột sống',
        'Tiêu hóa',
        'Tầm soát ung thư',
        'Chấn thương chỉnh hình'
    ];

    const optionTopics = [
        'Tất cả'
    ];

    return <Modal
        {...props}
        show={showPopup}
        onHide={() => setShowPopup(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="appointment-popup"
    >
        <div style={{position: "absolute"}}>
            <Image src={"/images/popup.png"}
                   alt="vietlife"
                   priority={true}
                   width={441}
                   height={450}/>
        </div>
        <Modal.Header closeButton/>
        <Modal.Body>
            <Row>
                <Col xs={12} md={6}>
                    <div className="image-block"/>
                </Col>
                <Col xs={12} md={6}>
                    <div className="p-2">
                        <h5 className="fw-bold title">ĐĂNG KÍ NHẬN BẢN TIN SỨC KHỎE</h5>
                        <NewsletterForm>
                            {(handleSubmit, handleChange, values, touched, isValid, errors, setFieldTouched, setFieldValue, isSuccess, loading) => (
                                <div>
                                    <Form.Group className="mb-4" controlId="email">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">
                                                <Icon icon={"charm:mail"} width={16} height={16}/>
                                            </InputGroup.Text>
                                            <Form.Control type="text"
                                                          name="email"
                                                          value={values.email}
                                                          onChange={handleChange}
                                                          isInvalid={!!errors.email}
                                                          placeholder="Email (bắt buộc)"/>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <h6>Các chuyên đề quan tâm</h6>
                                    <Form.Group className="mb-4 topic-checkbox" controlId="topic">
                                        <Row>
                                            {topics.map((item, idx) => {
                                                return <Col xs={6} key={`f_topic${idx}`}>
                                                    <Form.Check id={`topic${idx}`}
                                                                className='mb-2'
                                                                type="checkbox">
                                                        <Form.Check.Input type={"checkbox"}
                                                                          htmlFor={`topic${idx}`}
                                                                          value={item}
                                                                          checked={values.topic.indexOf(item) >= 0}
                                                                          onChange={e => {
                                                                              const set = new Set(values.topic);
                                                                              if(e.target.checked){
                                                                                  set.add(item);
                                                                              }else{
                                                                                  set.delete(item);
                                                                              }
                                                                              setFieldValue('topic', Array.from(set));
                                                                          }}
                                                        />
                                                        <Form.Check.Label>{item}</Form.Check.Label>
                                                    </Form.Check>
                                                </Col>
                                            })}
                                        </Row>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.topic}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="acceptReceiveUpdate">
                                        <Form.Check name={'acceptReceiveUpdate'}
                                                    type="checkbox"
                                        >
                                            <Form.Check.Input type={"checkbox"}
                                                              checked={values.acceptReceiveUpdate}
                                                              isInvalid={!!errors.acceptReceiveUpdate}
                                                              onChange={e => setFieldValue('acceptReceiveUpdate',
                                                                  e.target.checked)
                                                              }
                                            />
                                            <Form.Check.Label>
                                                Đăng ký nhận các chương trình ưu đãi từ Vietlife Clinic
                                            </Form.Check.Label>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.acceptReceiveUpdate}
                                            </Form.Control.Feedback>
                                        </Form.Check>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="optionTopic">
                                        <Form.Select aria-label="optionTopic"
                                                     name="optionTopic"
                                                     value={values.optionTopic}
                                                     onChange={handleChange}
                                                     isInvalid={!!errors.optionTopic}
                                        >
                                            {optionTopics.map((item, idx) => {
                                                return <option key={`f_op${idx}`} value={item}>{item}</option>
                                            })}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.optionTopic}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <div className="d-flex justify-content-center">
                                        <Form.Group className="" controlId="subject">
                                            {!isSuccess &&
                                            <Button disabled={loading}
                                                    type="submit"
                                                    style={{width: "320px", height: "50px", borderRadius: "5px"}}
                                                    className="btn btn-success text-light">
                                                ĐĂNG KÝ NGAY
                                            </Button>}
                                            {isSuccess && <Alert key="success" variant="success">
                                                Cảm ơn bạn đã quan tâm ! Vietlife đã nhận thông tin và sớm liên lạc với
                                                bạn
                                            </Alert>}
                                        </Form.Group>
                                    </div>
                                </div>
                            )}
                        </NewsletterForm>
                    </div>
                </Col>
            </Row>
        </Modal.Body>
    </Modal>
};

export default memo(AppointmentPopup);