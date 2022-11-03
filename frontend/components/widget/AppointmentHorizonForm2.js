import React, {memo, useState} from "react";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import AppointmentForm from "../AppointmentForm";
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import {SPECIALIST} from "../../ulti/appConst";
import {formatDate} from "../../ulti/helper";
import vi from 'date-fns/locale/vi';
import en from 'date-fns/locale/en-US';
registerLocale('vi', vi);
registerLocale('en', en);

const AppointmentHorizonForm2 = ({locale = "vi", className}) => {
    const {retailList = []} = useAppContext();
    const [bookingDate, setBookingDate] = useState(new Date());

    const onChangeDate = (e) => {
        setBookingDate(e);
    };

    return <AppointmentForm locale={locale}>
        {(handleSubmit, handleChange, values, touched, isValid, errors, setFieldTouched, setFieldValue, isSuccess, loading) => (
            <div className="welcome-form">
                <div className="form-content bg-color-g-b-v"  style={{borderTopLeftRadius: "7px"}}>
                    <Row>
                        <Col xs={12} lg={6}>
                            <Form.Group className="mb-4" controlId="fullname">
                                <Form.Control type="text"
                                              name="fullname"
                                              value={values.fullname}
                                              onChange={handleChange}
                                              isInvalid={!!errors.fullname}
                                              placeholder="Họ và tên"/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.fullname}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="mobile">
                                <Form.Control type="text"
                                              value={values.mobile}
                                              onChange={handleChange}
                                              isInvalid={!!errors.mobile}
                                              placeholder="Số điện thoại"/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.mobile}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="retail">
                                <Form.Select name="retail"
                                             value={values.retail}
                                             onChange={handleChange}
                                             isInvalid={!!errors.retail}
                                >
                                    <option>Chọn cơ sở</option>
                                    {retailList && retailList.map(item => {
                                        return <option key={`retail${item.id}`}
                                                       value={item.id}>{item.attributes.name}</option>
                                    })}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.retail}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="specialist">
                                <Form.Select name="specialist"
                                             value={values.specialist}
                                             onChange={handleChange}
                                             isInvalid={!!errors.specialist}>
                                    <option key={`s-0`}> Chọn chuyên khoa</option>
                                    {SPECIALIST.map((item, idx) => {
                                        return <option key={`s-${idx}`} value={item}>{item}</option>
                                    })}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.specialist}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="note">
                                <Form.Control as="textarea"
                                              rows={5}
                                              name="note"
                                              value={values.note}
                                              onChange={handleChange}
                                              isInvalid={!!errors.note}
                                              placeholder="Nội dung"/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.note}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} lg={6} className="vl-group-dp">
                            <div className="group-date-time">
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group className="" controlId="bookingTime">
                                            <Form.Label>Giờ khám</Form.Label>
                                            <Form.Select aria-label="Giờ"
                                                         name="bookingTime"
                                                         className="timepicker"
                                                         value={values.bookingTime}
                                                         onChange={handleChange}
                                                         isInvalid={!!errors.bookingTime}
                                            >
                                                <option>Chọn giờ khám</option>
                                                <option key={1} value="7h00-9h00">7h00-9h00</option>
                                                <option key={2} value="9h00-11h00">9h00-11h00</option>
                                                <option key={3} value="11h00-12h00">11h00-12h00</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.bookingTime}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="" controlId="bookingTime">
                                            <Form.Label>Ngày khám</Form.Label>
                                            <div className="booking-date-lbl">{formatDate(bookingDate)}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <Form.Group className="mb-4 vl-datepicker" controlId="bookingDate">
                                <DatePicker
                                    selected={values.bookingDate}
                                    dateFormat={"dd/MM/yyyy"}
                                    placeholder="Ngày"
                                    onChange={(e) => {
                                        setFieldValue('bookingDate', e);
                                        setFieldTouched('bookingDate');
                                        onChangeDate(e);
                                    }}
                                    locale={locale}
                                    className="form-control"
                                    isInvalid={!!errors.bookingDate}
                                    minDate={new Date()}
                                    inline
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.bookingDate}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center">
                        <Form.Group className="" controlId="subject">
                            {!isSuccess &&
                            <Button disabled={loading}
                                    type="submit"
                                    style={{width: "320px", borderRadius: "20px"}}
                                    className="btn btn-success text-light">
                                Đặt lịch
                            </Button>}
                            {isSuccess && <Alert key="success" variant="success">
                                Cảm ơn bạn đã quan tâm ! Vietlife đã nhận thông tin và sớm liên lạc với bạn
                            </Alert>}
                        </Form.Group>
                    </div>
                </div>
            </div>
        )}
    </AppointmentForm>;
};


export default memo(AppointmentHorizonForm2);