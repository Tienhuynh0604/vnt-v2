import React, {memo} from "react";
import {Col, Row} from "react-bootstrap";
import Image from "next/image";

const WhyChooseWidget = (props) => {
    const {className} = props;

    return <Row className={`${className}`}>
        <Col xs={24}>
            <h3 className="text-uppercase mb-4 fw-bold">Vì sao nên chọn Vietlife</h3>
        </Col>
        <Col xs={12} xl={4}>
            <div className="featureItem bg-color-g-g-c">
                <div className="featureItemImg">
                    <Image src={"/images/icon_welcome.png"} width={54} height={53} alt="VL"/>
                </div>
                <div className="featureItemContent">
                    <h6>20</h6>
                    <span>Năm kinh nghiệm khám chữa bệnh</span>
                </div>
            </div>
        </Col>
        <Col xs={12} xl={4}>
            <div className="featureItem bg-color-g-g-c">
                <div className="featureItemImg">
                    <Image src={"/images/icon_welcome2.png"}
                           width={70} height={70} alt="VL"/>
                </div>
                <div className="featureItemContent featureItemContent2">
                    <div className='featureItemWrapper'>
                        <h6>05+</h6>
                        <span>PGS.TS, Chuyên gia đầu ngành</span>
                    </div>
                    <div className='featureItemWrapper'>
                        <h6>50+</h6>
                        <span>Bác sĩ các bệnh viện lớn</span>
                    </div>
                </div>
            </div>
        </Col>
        <Col xs={12} xl={4}>
            <div className="featureItem bg-color-g-g-c">
                <div className="featureItemImg">
                    <Image src={"/images/icon_welcome3.png"} width={54} height={53} alt="VL"/>
                </div>
                <div className="featureItemContent">
                    <h6>+100 tỷ</h6>
                    <span>Hệ thống máy móc hiện đại</span>
                </div>
            </div>
        </Col>
    </Row>
};


export default memo(WhyChooseWidget);