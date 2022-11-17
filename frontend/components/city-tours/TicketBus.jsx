import React, {memo, useState} from "react";
import {OurTourData} from "../../data/FakeData";
import {Col, Row} from "react-bootstrap";
import ProductCard from "../ProductCard";
import Link from "next/link";
import {Icon} from "@iconify/react";

const data = OurTourData;

const TicketBus = ({}) => {

    const [currentSelect, setCurrentSelect] = useState("ticket-bus");

    return <div className="ticket-bus-block my-5">
        <ol className="breadcrumb">
            <li className={`breadcrumb-item ${currentSelect === "ticket-bus" && "active"}`} aria-current="page">
                <span>Ticket Bus</span>
            </li>
            <li className={`breadcrumb-item ${currentSelect === "custom-tour" && "active"}`} aria-current="page">
                <span>Custom tour</span>
            </li>
        </ol>
        <Row>
            {data.map((item, idx) => (
                <Col key={`p-c${idx}`} xs={12} md={6} lg={4} xxl={3}>
                    <ProductCard item={item} className="city-tour-item"/>
                </Col>
            ))}
            <ul className="pagination justify-content-center mt-4">
                <li className="page-item">
                    <Link className="page-link" href="#">
                        <Icon icon={"akar-icons:chevron-left"}/>
                    </Link>
                </li>
                <li className="page-item">
                    <Link className="page-link active" href="#">1</Link>
                </li>
                <li className="page-item">
                    <Link className="page-link" href="#">
                        <Icon icon={"akar-icons:chevron-right"}/>
                    </Link>
                </li>
            </ul>
        </Row>
    </div>
};

export default memo(TicketBus);
