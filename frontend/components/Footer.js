import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Icon} from "@iconify/react";
import {Col, Container, Row} from "react-bootstrap";
import {useAppContext} from "../layouts/AppLayout";
import {nl2br, renderImage, renderContactItem} from "../ulti/appUtil";

const Footer = () => {
    const {common = {}} = useAppContext();
    return <footer className="footer-section">
        <div className="bg-primary py-5">
            <Container>
                <Row className="g-3">
                    <Col xs={12} className="pb-5">
                        {renderImage(common.logoFooter)}
                    </Col>
                    <Col xs={12} md={3}>
                        {common.slogan}
                    </Col>
                    <Col xs={12} md={3}>
                        <h4 className="mb-4">Contact us</h4>
                        <ul className="list-unstyled">
                            <li className={"mb-2"} key={`f_c_add`}>
                                <Icon icon="ion:map"/> {common.address}
                            </li>
                            {common.email && <li className={"mb-2"} key={`f_c_e`}>
                                {renderContactItem(common.email)}
                            </li>}
                            {common.phone && <li key={`f_c_p`}>
                                {renderContactItem(common.phone)}
                            </li>}
                        </ul>
                    </Col>
                    <Col xs={12} md={3}>
                        <h4>Information</h4>
                    </Col>
                    <Col xs={12} md={3}>
                        <h4 className="mb-3">Follow us</h4>
                        <ul className="list-inline list-unstyled">
                            {common.socials.map(item => (
                                <li className="list-inline-item mb-2" key={`f_s_i${item.id}`}>
                                    {renderContactItem(item, '', false)}
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
        <Container className="py-2">
            <Row className="g-sm-2">
                <Col xs={12} md={6} className="d-flex align-items-center
                justify-content-sm-center
                justify-content-lg-start">
                    @Copyright {common.companyName}
                </Col>
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-sm-center justify-content-lg-end">
                    <ul className="mb-0 list-inline list-unstyled">
                        <li className="list-inline-item">
                            <Link href={"/"}>
                                Terms of use and sale
                            </Link>
                        </li>
                        <li className="list-inline-item"> | </li>
                        <li className="list-inline-item">
                            <Link href={"/"}>
                                Support
                            </Link>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    </footer>;
};

export default Footer;