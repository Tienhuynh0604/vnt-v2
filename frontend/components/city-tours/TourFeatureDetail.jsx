import React, {memo} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const TourFeatureDetail = ({name, id, children}) => {

    const {t} = useTranslation("common");

    return <div id={id}>
        <Row className={"py-3"}>
            <Col xs={12} md={3}>
                <h3 className="text-uppercase">{t(name)}</h3>
            </Col>
            <Col xs={12} md={9}>
                {children}
            </Col>
        </Row>
        <hr/>
    </div>
};

export default memo(TourFeatureDetail);