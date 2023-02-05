import React, {memo, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Col, Form, Row, Tab, Table, Tabs} from "react-bootstrap";
import DatePicker from "react-datepicker";
import InputNumberPlusMinus from "./InputNumberPlusMinus";
import {Icon} from "@iconify/react";
import Link from "next/link";
import BookingConfirmStep from "./BookingConfirmStep";
import TicketBusStep from "./step/TicketBusStep";

const TicketBookingStep = ({productId}) => {
    const {t} = useTranslation("common");
    const [selectedTab, setSelectedTab] = useState("step-1");
    const onClickNext = () => {
        setSelectedTab("step-confirm");
    };

    const backToStep1 = () => {
        setSelectedTab("step-1");
    };

    return <Tabs
        defaultActiveKey={selectedTab}
        activeKey={selectedTab}
        onSelect={tab => setSelectedTab(tab)}
        justify
        id="modal-booking"
        className="mb-3"
    >
        <Tab eventKey="step-1" title={<>1. Select your ticket</>}>
            <TicketBusStep productId={productId}/>
        </Tab>
        <Tab eventKey="step-confirm" title={<>2. Verify information</>}>
            <BookingConfirmStep onBack={backToStep1}/>
        </Tab>
    </Tabs>
};


export default memo(TicketBookingStep);