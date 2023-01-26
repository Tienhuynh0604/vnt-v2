import React, {memo} from "react";
import {Container, Col, Row} from "react-bootstrap";
import Slider from "@ant-design/react-slick";
import {renderImage, SlickNextArrow, SlickPrevArrow} from "../../ulti/appUtil";
import ProductCard from "../ProductCard";
import Image from "next/image";

const UniqueTourSlider = ({tours = []}) => {

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        lazyLoad: true,
        slidesToShow: tours.length > 1 ? 2 : 1,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <SlickNextArrow/>,
        prevArrow: <SlickPrevArrow/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return <Slider {...settings}>
        {tours?.map((item, idx) => {
            return <ProductCard key={`p_i${idx}`}
                                destination={item.attributes.destination?.data}
                                item={item} className="unique-item"/>
        })}
    </Slider>
};

const UniqueTour = ({dataSource = {}, tours = []}) => {

    const {hotFeature = {}} = dataSource.attributes;

    return <section className="page-section unique-section bg-grey">
        <Container>
            <Row>
                <Col xs={12} md={5} className="pe-4">
                    {renderImage(hotFeature.image)}
                    <h2 className="mt-4">{hotFeature.subTitle}</h2>
                    <h1 className="mb-4"><span>{hotFeature.title}</span></h1>
                    <div className="ck-content" dangerouslySetInnerHTML={{
                        __html: hotFeature.content
                    }}/>
                </Col>
                <Col xs={12} md={7} style={{zIndex: 100}}>
                    <UniqueTourSlider tours={tours}/>
                </Col>
            </Row>
        </Container>
        <Image src="/images/image-bg-1.png"
               width={658}
               height={522}
               className="position-absolute"
               alt={"vn-sightseeing"}
               style={{
                   left: 0,
                   bottom: 0,
                   maxWidth: "100%",
               }}
        />
    </section>
};

export default memo(UniqueTour);