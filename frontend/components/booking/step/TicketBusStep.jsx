import React, {memo, useEffect, useState} from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import DatePicker from "react-datepicker";
import InputNumberPlusMinus from "../InputNumberPlusMinus";
import {callGet} from "../../../ulti/helper";
import {toast} from "react-toastify";

const TicketBusStep = ({productId}) => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (productId) {
            getPaymentDetail(productId).catch(e => console.error(e));
        }
    }, [productId]);

    const getPaymentDetail = async (productId) => {
        try {
            setIsLoading(true);
            console.log("getPaymentDetail");
            const res = await callGet(`/tours/payment-product/${productId}`);
            console.log(res.data);
        } catch (e) {
            toast(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return <div className="booking-form-wrap">
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="bookingDate">
                <Form.Label column sm="2">
                    Choose date
                </Form.Label>
                <Col sm="10">
                    <DatePicker
                        selected={new Date()}
                        dateFormat={"dd/MM/yyyy"}
                        placeholder="dd/mm/yyyy"
                        className="form-control"
                        minDate={new Date()}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="bookingDate">
                <Form.Label column sm="2">
                    Ticket type
                </Form.Label>
                <Col sm="10">
                    <div key={`inline-radio`} className="mb-3">
                        <Form.Check
                            inline
                            label="4 hours"
                            name="group1"
                            type={"radio"}
                            id={`inline-radio-1`}
                        />
                        <Form.Check
                            inline
                            label="24 hours"
                            name="group1"
                            type={"radio"}
                            id={`inline-radio-2`}
                        />
                        <Form.Check
                            inline
                            label="48 hours"
                            type={"radio"}
                            id={`inline-radio-3`}
                        />
                    </div>
                </Col>
            </Form.Group>
            <Table className="booking-table" striped responsive>
                <thead>
                <tr>
                    <th>Ticket</th>
                    <th>Price</th>
                    <th className="text-center">Quantity</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        Adult (13+)
                    </td>
                    <td>
                        $23.00
                    </td>
                    <td>
                        <InputNumberPlusMinus value={2}/>
                    </td>
                    <td className="text-end">
                        $46.00
                    </td>
                </tr>
                <tr>
                    <td>
                        Child (4-12)
                    </td>
                    <td>
                        $8.00
                    </td>
                    <td>
                        <InputNumberPlusMinus value={1}/>
                    </td>
                    <td className="text-end">
                        $8.00
                    </td>
                </tr>
                </tbody>
            </Table>
        </Form>
        <div className="text-end">
            <strong>Sub total:</strong> <span className="sub-total">$60.00</span>
        </div>
        <div className="mt-3 d-flex justify-content-center">
            <Button type="button" onClick={() => onClickNext()} className="px-5 py-2">Next</Button>
        </div>
    </div>
};

export default TicketBusStep;