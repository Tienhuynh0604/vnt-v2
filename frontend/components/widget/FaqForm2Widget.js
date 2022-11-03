import React, {memo} from "react";
import FaqForm from "../FaqForm";
import {Alert, Row, Col, Form, Button} from "react-bootstrap";

const FaqForm2Widget = ({locale}) => {
    return <FaqForm locale={locale}>
        {(handleSubmit, handleChange, values, touched, isValid, errors, isSuccess, loading) => (
            <Row>
                <Col xs={12} md={6}>
                    <Form.Group className="mb-4" controlId="name">
                        <Form.Control name="name"
                                      value={values.name}
                                      onChange={handleChange}
                                      required size="sm"
                                      type="text"
                                      isInvalid={!!errors.name}
                                      placeholder="Họ và tên"/>
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="phone">
                        <Form.Control name="phone"
                                      value={values.phone}
                                      onChange={handleChange}
                                      required size="sm"
                                      type="text"
                                      isInvalid={!!errors.phone}
                                      placeholder="Số điện thoại"/>
                        <Form.Control.Feedback type="invalid">
                            {errors.phone}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="email">
                        <Form.Control name="email"
                                      value={values.email}
                                      onChange={handleChange}
                                      size="sm"
                                      type="text"
                                      isInvalid={!!errors.email}
                                      placeholder="Email"/>
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                    <Form.Group required className="mb-4" controlId="question">
                        <Form.Control name="question"
                                      value={values.question}
                                      onChange={handleChange}
                                      isInvalid={!!errors.question}
                                      size="sm"
                                      as="textarea" rows={3}
                                      placeholder="Câu hỏi dành cho chuyên gia"/>
                        <Form.Control.Feedback type="invalid">
                            {errors.question}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4 d-flex justify-content-center w-100"
                                controlId="subject">
                        {!isSuccess &&
                        <Button disabled={loading} type="submit" className="btn-send btn btn-success text-light w-100">
                            Gửi yêu cầu
                        </Button>}
                        {isSuccess && <Alert key="success" variant="success">
                            Cảm ơn bạn đã quan tâm ! Vietlife đã ghi nhận và sẽ giải đáp thắc mắc của bạn trong thời
                            gian sớm nhất
                        </Alert>}
                    </Form.Group>
                </Col>
            </Row>
        )}
    </FaqForm>;
};


export default memo(FaqForm2Widget);