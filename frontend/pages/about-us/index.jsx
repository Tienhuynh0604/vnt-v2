import React, {memo} from "react";
import {Container, Col, Row} from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import {callGet, imagePopulate} from "../../ulti/helper";
import {strapiImg} from "../../ulti/strapiHelper";
import Error from "next/error";

const Page = ({model}) => {
    const {t} = useTranslation("common");

    if (!model) {
        return <Error statusCode={404}/>
    }

    const renderImagesColumn = () => {
        let colLeft = [];
        let colRight = [];
        if (model.attributes.images) {
            model.attributes.images.data.forEach((item, idx) => {
                if (idx % 2 === 0) {
                    colLeft.push(item);
                } else {
                    colRight.push(item);
                }
            });
        }
        return <Row>
            <Col>
                {colLeft.map((item, idx) => {
                    console.log(item);
                    return <div key={`cl${idx}`} className="image-thumb">
                        {strapiImg(item, 'rounded-4', true)}
                    </div>
                })}
            </Col>
            <Col>
                {colRight.map((item, idx) => {
                    return <div key={`cr${idx}`} className={`image-thumb ${idx === 0 ? "mt-5" : ""}`}>
                        {strapiImg(item, 'rounded-4', true)}
                    </div>
                })}
            </Col>
        </Row>
    };

    return <PageLayout title="About us" breadcrumbs={[
        {
            link: "#",
            title: t("about us"),
        }
    ]}>
        <Container className="about-us-page">
            <Row>
                <Col xs={12} md={7}>
                    <h2 className="my-4">
                        {model.attributes.title}
                    </h2>
                    <div className="ck-content" dangerouslySetInnerHTML={{
                        __html: model.attributes.content
                    }}/>
                </Col>
                <Col xs={12} md={5}>
                    {renderImagesColumn()}
                </Col>
            </Row>
        </Container>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = 'en'} = context;

    let model = null;
    try{
        const res = await callGet("/about-us", {
            populate: {
                images: imagePopulate()
            }
        });
    
        model = res.data;
    }catch(e){
        console.log(e.response?.data || e.message);

    }

    return {
        props: {
            model: model,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};

export default memo(Page);