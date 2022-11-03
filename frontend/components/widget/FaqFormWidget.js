import React, {memo} from "react";
import FaqForm from "../FaqForm";
import {Alert, Button, Form} from "react-bootstrap";

const FaqFormWidget = ({locale = "vi", className}) => {
    return <FaqForm locale={locale}>
        {(handleSubmit, handleChange, values, touched, isValid, errors, isSuccess, loading) => (
            <div className={`form-faq-wg ${className}`}>
                <h4>Hỏi đáp chuyên gia</h4>
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
            </div>
        )}
    </FaqForm>;
};


export default memo(FaqFormWidget);