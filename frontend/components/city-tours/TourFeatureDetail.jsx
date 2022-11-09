import React, {memo} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const TourFeatureDetail = ({name, children}) => {

    const {t} = useTranslation("common");

    return <>
        <Row className={"py-3"}>
            <Col xs={12} md={3}>
                <h3 className="text-uppercase">{t(name)}</h3>
            </Col>
            <Col xs={12} md={9}>
                {children}
            </Col>
        </Row>
        <hr/>
    </>
};

export default memo(TourFeatureDetail);