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
    const [selectedTab, setSelectedTab] = useState({
        tabKey: "step-1",
        values: {}
    });
    const [productData, setProductData] = useState({
        rawProduct: null,
        attributes: null,
        products: []
    });
    const [priceList, setPriceList] = useState([]);

    const onClickNext = (values) => {
        setSelectedTab({
            tabKey: "step-confirm",
        });
        setPriceList(values);
    };

    const backToStep1 = () => {
        setSelectedTab(prev => ({
            ...prev,
            tabKey: "step-1",
        }));
    };

    return <Tabs
        defaultActiveKey={selectedTab.tabKey}
        activeKey={selectedTab.tabKey}
        justify
        id="modal-booking"
        className="mb-3"
    >
        <Tab eventKey="step-1" title={<>1. Select your ticket</>}>
            <TicketBusStep productId={productId}
                           productData={productData}
                           setProductData={setProductData}
                           priceList={priceList}
                           setPriceList={setPriceList}
                           onClickNext={onClickNext}/>
        </Tab>
        <Tab eventKey="step-confirm" title={<>2. Verify information</>}>
            <BookingConfirmStep productData={productData}
                                productId={productId}
                                priceList={priceList}
                                onBack={backToStep1}/>
        </Tab>
    </Tabs>
};


export default memo(TicketBookingStep);