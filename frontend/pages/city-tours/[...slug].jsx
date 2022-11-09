import React from "react";
import {initialProps} from "../../ulti/helper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Button, Col, Container, Row} from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import Link from "next/link";
import {Icon} from "@iconify/react";
import {useTranslation} from "next-i18next";
import ImageSlider from "../../components/city-tours/ImageSlider";
import TourFeatures from "../../components/city-tours/TourFeatures";
import TourFeatureDetail from "../../components/city-tours/TourFeatureDetail";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import DecorComponent from "../../components/DecorComponent";

const Page = ({}) => {
    const {t} = useTranslation("common");

    return <PageLayout>
        <Container className="tour-detail">
            <div className="d-flex justify-content-between">
                <div>
                    <div>
                        <h1>Hà Nội Double - Decker Bus</h1>
                        <Link href={"#"}>
                            <Icon icon={"ant-design:download-outlined"}/> Download Brochue
                        </Link>
                    </div>
                    <nav className="price-list" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                {t("Adults")}: <strong>$10.00</strong>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                                {t("Child")}: <strong>$8.00</strong>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Button className="btn btn-primary btn-book">{t('Book now')}</Button>
            </div>
            <ImageSlider/>
            <div className='mt-3'>
                <TourFeatures/>
            </div>
            <hr className="bold"/>
            <TourFeatureDetail name={"Overview"}>
                <p>
                    Thang Long – Hanoi City Tour with a route of about 90 minutes will take visitors across scenic
                    places, works, historical relics, cultural and religious major of Hanoi such as Ly Thai Flower
                    Garden, Sofitel Metropole Hotel, Vietnam Military History Museum, Thang Long Imperial Citadel, Quan
                    Thanh Temple, Tran Quoc Pagoda, Ho Chi Minh Complex, Temple of Literature, Hoa Lo Prison, Hanoi
                    Cathedral, Hanoi Old Quarter, Hoan Kiem Lake
                    or Opera House
                </p>
            </TourFeatureDetail>
            <TourFeatureDetail name={"DESCRIPTION"}>
                <p>
                    As one of the first companies that bring double-decker bus to Thang Long – Hanoi, the city tour aims
                    to give you an overview of this thousand year old capital and provide an understanding of prominent
                    attractions as well as historical and cultural sites of Hanoi
                </p>
            </TourFeatureDetail>
            <TourFeatureDetail name={"HIGHLIGHT"}>
                <Row>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-success" icon={"akar-icons:check"} height={24}/> Vietnam Sightseeing
                        Double – decker bus in Hanoi
                    </Col>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-success" icon={"akar-icons:check"} height={24}/> Unlimited access to key
                        sightseeing in Hanoi
                        (ticket valid in 4 hour)
                    </Col>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-success" icon={"akar-icons:check"} height={24}/> Tour Hanoi at your own
                        pace and see the best of
                        Hanoi’s iconic landmarks
                    </Col>
                </Row>
            </TourFeatureDetail>
            <TourFeatureDetail name={"INCLUDED"}>
                <Row>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-success" icon={"akar-icons:check"} height={24}/> Entrance fees
                    </Col>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-success" icon={"akar-icons:check"} height={24}/> Food and other drinks
                    </Col>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-success" icon={"akar-icons:check"} height={24}/> Hotel pickup and drop-off
                    </Col>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-success" icon={"akar-icons:check"} height={24}/> Gratuities (optional)
                    </Col>
                </Row>
            </TourFeatureDetail>
            <TourFeatureDetail name={"EXCLUDED"}>
                <Row>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-danger" icon={"ep:close-bold"} height={24}/> Entrance fees
                    </Col>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-danger" icon={"ep:close-bold"} height={24}/> Food and other drinks
                    </Col>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-danger" icon={"ep:close-bold"} height={24}/> Hotel pickup and drop-off
                    </Col>
                    <Col xs={12} md={6} className="highlight-item">
                        <Icon className="text-danger" icon={"ep:close-bold"} height={24}/> Gratuities (optional)
                    </Col>
                </Row>
            </TourFeatureDetail>
            <TourFeatureDetail name={"WHAT TO BRING"}>
                <div className="icon-flex-wrap">
                    <div className="btn-icon">
                        <Icon icon={"fluent-mdl2:shirt"} height={45}/>
                        <br/>
                        <span>Comfortable clothes</span>
                    </div>
                    <div className="btn-icon">
                        <Icon icon={"emojione-monotone:running-shoe"} height={45}/>
                        <br/>
                        <span>Shoes</span>
                    </div>
                    <div className="btn-icon">
                        <Icon icon={"mdi:sunglasses"} height={45}/>
                        <br/>
                        <span>Sunglasses</span>
                    </div>
                    <div className="btn-icon">
                        <Icon icon={"bi:sun"} height={45}/>
                        <br/>
                        <span>Sun cream</span>
                    </div>
                </div>
            </TourFeatureDetail>
            <TourFeatureDetail name={"CANCELLATION POLICY"}>
                <Row>
                    <Col xs={6}>Time before starting tour</Col>
                    <Col xs={6} className="fw-bold">Expense</Col>
                    <Col xs={6}>Before 24 hours</Col>
                    <Col xs={6} className="fw-bold">0% Combo value</Col>
                    <Col xs={6}>After 24 hours</Col>
                    <Col xs={6} className="fw-bold">50% Combo value</Col>
                </Row>
            </TourFeatureDetail>
            <TourFeatureDetail name={"CHECK-IN INFORMATION"}>
                <ul>
                    <li>Guests are to check-in 15 minutes prior to Doubler - Decker Bus</li>
                    <li>Simply present your e-Receipt to staff for exchange of tickets.</li>
                </ul>
            </TourFeatureDetail>
            <TourFeatureDetail name={"BEFORE YOU GO"}>
                <p>Buses depart for Vietnam Sightseeing following timings:</p>
                <b>Times are subject to change due to local traffic conditions.</b>
                <div className="position-relative py-3">
                    <LightGallery speed={500}>
                        <Link href={`/images/time-table.jpg`}>
                            <Image src={`/images/time-table.jpg`}
                                   width={1070}
                                   height={730}
                                   className="w-100"
                                   alt={""}/>
                        </Link>
                    </LightGallery>
                </div>
                <ul>
                    <li>Confirmation will be received at time of booking</li>
                    <li>Redeem your voucher at kiosk at 51 Ly Thai To street</li>
                    <li>During the weekend, the bus does not pick up at stop 02 due to the walking street (From 6:00 pm
                        Friday night to 12:00 am Sunday every week)
                    </li>
                    <li>Wheelchair accessible on lower deck</li>
                    <li>Recorded commentary available in English, Vietnamese, Chinese, Japanese, Korean, French, Spain,
                        Germany
                    </li>
                    <li>During road closures, some bus stops may be skipped; in the event that this occurs, notices will
                        be posted on buses
                    </li>
                    <li>Times of activities may very slightly. Itinerary and program subject to change when necessary
                    </li>
                    <li>Tips, personal expenses not included;</li>
                </ul>
            </TourFeatureDetail>
            <TourFeatureDetail name={"MAP"}>
                <div className="position-relative py-3">
                    <LightGallery speed={500}>
                        <Link href={`/images/map.jpg`}>
                            <Image src={`/images/map.jpg`}
                                   width={1070}
                                   height={533}
                                   className="w-100"
                                   alt={""}/>
                        </Link>
                    </LightGallery>
                </div>
                <Button className="text-uppercase">{t("live tracking")}</Button>
            </TourFeatureDetail>
            <TourFeatureDetail name={"main stop"}>
            </TourFeatureDetail>
        </Container>
        <DecorComponent/>
    </PageLayout>;
};

export const getServerSideProps = async (context) => {
    const {locale = "vi"} = context;
    let initProps = {};
    try {
        initProps = await initialProps(context);
    } catch (e) {
        initProps = {};
    }
    return {
        props: {
            ...initProps,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};

export default Page;