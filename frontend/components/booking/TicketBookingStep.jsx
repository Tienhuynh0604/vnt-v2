import React, {memo, useState} from "react";
import {useTranslation} from "react-i18next";
import {Tab, Tabs} from "react-bootstrap";
import BookingConfirmStep from "./BookingConfirmStep";
import TicketBusStep from "./step/TicketBusStep";

const TicketBookingStep = ({productId}) => {
    const [selectedTab, setSelectedTab] = useState({
        tabKey: "step-1",
        values: {}
    });
    const [productData, setProductData] = useState(null);
    const [vnsPriceList, setPriceList] = useState([]);

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
                           setProductData={setProductData}
                           productData={productData}
                           onClickNext={onClickNext}/>
        </Tab>
        <Tab eventKey="step-confirm" title={<>2. Verify information</>}>
            <BookingConfirmStep productId={productId}
                                productData={productData}
                                vnsPriceList={vnsPriceList}
                                onBack={backToStep1}/>
        </Tab>
    </Tabs>
};


export default memo(TicketBookingStep);