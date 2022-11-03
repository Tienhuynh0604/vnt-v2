import React from "react";
import {Row, Col} from "react-bootstrap";
import Image from "next/future/image";
import {Icon} from "@iconify/react";

const RelatedArticle = ({className, category, title = "Bài viết liên quan", locale = 'vi'}) => {
    return <div className={`${className}`}>
        <h5 className="fw-bold">{title}</h5>
        <Row className="g-4">
            <Col xs={24}>
                <Row className="latest-new-item">
                    <Col xs={4}>
                        <Image alt={"Vietlife"} src={`/images/news/1.png`}
                               width="0"
                               height="0"
                               sizes="100vw"
                               style={{width: '100%', height: 'auto'}}/>
                    </Col>
                    <Col xs={8}>
                        <h3>ĐAU KHỚP CÓ PHẢI CỨ HẾT ĐAU LÀ KHỎI BỆNH</h3>
                        <div className="mb-3">
                            <Icon color="#0071DC" width={20} height={20} icon="ant-design:clock-circle-outlined"/>
                            <small>{' '}19/12/2022</small>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed integer metus sit
                            ultrices </p>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <Row className="latest-new-item">
                    <Col xs={4}>
                        <Image alt={"Vietlife"} src={`/images/news/2.png`}
                               width="0"
                               height="0"
                               sizes="100vw"
                               style={{width: '100%', height: 'auto'}}/>
                    </Col>
                    <Col xs={8}>
                        <h3>ĐAU KHỚP CÓ PHẢI CỨ HẾT ĐAU LÀ KHỎI BỆNH</h3>
                        <div className="mb-3">
                            <Icon color="#0071DC" width={20} height={20} icon="ant-design:clock-circle-outlined"/>
                            <small>{' '}19/12/2022</small>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed integer metus sit
                            ultrices </p>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <Row className="latest-new-item">
                    <Col xs={4}>
                        <Image alt={"Vietlife"} src={`/images/news/3.png`}
                               width="0"
                               height="0"
                               sizes="100vw"
                               style={{width: '100%', height: 'auto'}}/>
                    </Col>
                    <Col xs={8}>
                        <h3>ĐAU KHỚP CÓ PHẢI CỨ HẾT ĐAU LÀ KHỎI BỆNH</h3>
                        <div className="mb-3">
                            <Icon color="#0071DC" width={20} height={20} icon="ant-design:clock-circle-outlined"/>
                            <small>{' '}19/12/2022</small>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed integer metus sit
                            ultrices </p>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <Row className="latest-new-item">
                    <Col xs={4}>
                        <Image alt={"Vietlife"} src={`/images/news/1.png`}
                               width="0"
                               height="0"
                               sizes="100vw"
                               style={{width: '100%', height: 'auto'}}/>
                    </Col>
                    <Col xs={8}>
                        <h3>ĐAU KHỚP CÓ PHẢI CỨ HẾT ĐAU LÀ KHỎI BỆNH</h3>
                        <div className="mb-3">
                            <Icon color="#0071DC" width={20} height={20} icon="ant-design:clock-circle-outlined"/>
                            <small>{' '}19/12/2022</small>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed integer metus sit
                            ultrices </p>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
};

export default RelatedArticle;