import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { callGet, featurePopulate, imagePopulate, initialProps } from "../../ulti/helper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "../../layouts/PageLayout";
import DecorComponent from "../../components/DecorComponent";
import TicketBus from "../../components/city-tours/TicketBus";
import { useTranslation } from "next-i18next";
import PopularDestination from "../../components/city-tours/PopularDestination";
import { Icon } from "@iconify/react";

const Index = (props) => {

    const { t } = useTranslation("common");

    return <PageLayout>
        <div className="position-relative">
            <Container>
                <div className="text-center">
                    <h1 className="">Hà Nội Traveling</h1>
                </div>
                <hr />
                <p className="">
                    Thang Long – Hanoi City Tour with a route of about 90 minutes will take visitors across scenic places,
                    works, historical relics, cultural and religious major of Hanoi such as Ly Thai To Flower Garden,
                    Sofitel Metropole Hotel, Hanoi Center Post Office, Vietnam Military History Museum, Thang Long Imperial
                    Citadel, Quan Thanh Temple, Tran Quoc Pagoda, Ho Chi Minh Complex, Temple of Literature, Hoa Lo Prison,
                    Hanoi Cathedral, Hanoi Old Quarter, Women Museum, Hoan Kiem Lake or Opera House.
                </p>
                <TicketBus />

            </Container>
            <DecorComponent />
        </div>
        <div className="bg-grey pt-5">
            <Container>
                <PopularDestination />
            </Container>
        </div>
        <div className="pt-5">
            <Container>
                <h1 className="text-capitalize">{t("post about")} Ha Noi</h1>
                <Row>
                    <Col xs={12} md={4}>
                        <Icon icon={"ci:dot-02-s"} className="text-warning" height={16}/> City Sightseeing partners with Volkswagen for the European Championship
                    </Col>
                    <Col xs={12} md={4}>
                        <Icon icon={"ci:dot-02-s"} className="text-warning" height={16}/> City Sightseeing partners with Volkswagen for the European Championship
                    </Col>
                    <Col xs={12} md={4}>
                        <Icon icon={"ci:dot-02-s"} className="text-warning" height={16}/> City Sightseeing 
                    </Col>
                    <Col xs={12} md={4}>
                        <Icon icon={"ci:dot-02-s"} className="text-warning" height={16}/> City Sightseeing partners hip
                    </Col>
                    <Col xs={12} md={4}>
                        <Icon icon={"ci:dot-02-s"} className="text-warning" height={16}/> City Sightseeing partners with Volkswagen for the European Championship
                    </Col>
                    <Col xs={12} md={4}>
                        <Icon icon={"ci:dot-02-s"} className="text-warning" height={16}/> City Sightseeing partners with Volkswagen for the European Championship
                    </Col>
                    <Col xs={12} md={4}>
                        <Icon icon={"ci:dot-02-s"} className="text-warning" height={16}/> City Sightseeing partners with Volkswagen for the European Championship
                    </Col>
                </Row>
            </Container>
        </div>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const { locale = "vi" } = context;
    let initProps = {};
    try {
        initProps = await initialProps(context);

    } catch (e) {
    }
    return {
        props: {
            ...initProps,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};

export default Index;