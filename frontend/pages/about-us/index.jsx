import React, {memo} from "react";
import {Container, Col, Row} from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import Image from "next/image";

const Page = () => {
    const {t} = useTranslation("common");

    return <PageLayout title="About us">
        <Container className="about-us-page">
            <Row>
                <Col xs={12} md={7}>
                    <h2 className="my-4">
                        Established in January 2018, Vietnam Sightseeing Limited is an open-top
                    </h2>
                    <p>
                        double-decker sightseeing tour bus operator. We provide Thang Long – Ha Noi City Tour bus
                        service
                        with 11 stops which are famous attractions in Hanoi; Ha Long City Tour with 9 stops in Ha Long
                        City.
                        Not only support tourists transport to historical sites, famous landmarks of the destinations,
                        Vietnam Sightseeing also gives visitors a new experience when watching the panorama of the City
                        from above, finding out useful information about Hanoi, Ha Long right on board. Keeping up with
                        the world trend and tastes of travelers, the open-top double-decker Vietnam Sightseeing bus in
                        general will follow a youthful, friendly yet secure service, professional and prestigious.

                        This is also the important difference of the route when we put into operation.
                        In addition, with competitive rates and many incentive programs, Vietnam Sightseeing will be a
                        reasonable choice for tourists to visit Vietnam.
                        We are registered in Vietnam under company number 0108149809 and have our registered office at
                        43 Trang Tien street, Hoan Kiem district, Hanoi.
                        Our VAT number is 0108149809
                        VIETNAM SIGHTSEEING
                    </p>
                </Col>
                <Col xs={12} md={5}>
                    <Row>
                        <Col>
                            <div className="image-thumb">
                                <Image
                                    src={"/images/about-us/about-us1.jpg"}
                                    fill
                                    objectFit="cover"
                                    className="rounded-4"
                                    alt={"a"}
                                />
                            </div>
                            <div className="image-thumb">
                                <Image
                                    src={"/images/about-us/about-us2.jpg"}
                                    fill
                                    objectFit="cover"
                                    className="rounded-4"
                                    alt={"a"}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="image-thumb mt-5">
                                <Image
                                    src={"/images/about-us/about-us3.jpg"}
                                    fill
                                    objectFit="cover"
                                    className="rounded-4"
                                    alt={"a"}
                                />
                            </div>
                            <div className="image-thumb">
                                <Image
                                    src={"/images/about-us/about-us4.jpg"}
                                    fill
                                    objectFit="cover"
                                    className="rounded-4"
                                    alt={"a"}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = 'vi'} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};

export default memo(Page);