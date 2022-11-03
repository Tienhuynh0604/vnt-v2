import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {Container, Row, Col} from "react-bootstrap";
import {nl2br, renderContactItem, renderImage} from "../../ulti/appUtil";
import {useAppContext} from "../../layouts/AppLayout";

const AboutUsBlock = ({dataSource = {}}) => {

    const {common = {}} = useAppContext();

    const {t} = useTranslation("common");

    return <section className="page-section aboutus-section">
        <div className="aboutus-cover">
            <Container>
                <Row>
                    <Col xs={12} lg={6}>
                        <h1 className="text-light">{dataSource.title}</h1>
                        <p className="mt-3" dangerouslySetInnerHTML={{__html: nl2br(dataSource.subTitle)}}/>
                        <h6 className="mt-4 fw-bold text-capitalize">{t('follow us')}:</h6>
                        <ul className="list-inline list-unstyled social-items">
                            {common.socials.map(item => (
                                <li className="list-inline-item mb-2" key={`f_s_i${item.id}`}>
                                    {renderContactItem(item, '', false)}
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className="decor-bg"/>
                        {renderImage(dataSource.image, {
                            className: "decor-bg-2"
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    </section>
};

export default memo(AboutUsBlock);