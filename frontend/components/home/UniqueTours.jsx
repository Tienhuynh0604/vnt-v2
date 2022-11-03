import React, {memo} from "react";
import {Container, Col, Row} from "react-bootstrap";
import Slider from "@ant-design/react-slick";
import {renderImage, SlickNextArrow, SlickPrevArrow} from "../../ulti/appUtil";
import ProductCard from "../ProductCard";
import Image from "next/image";

const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 2,
    slidesToScroll: 2,
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

const data = [
    {
        id: 1,
        attributes: {
            thumbnail: {
                url: "/images/products/sp1.jpg",
                width: 342,
                height: 250,
                name: "sss"
            },
            title: "Ha Noi food tour 1 day by Motocycle",
            slug: "ha-noi-food-tour-1-day-by-motocycle",
            prices: [
                {
                    price: 10.00,
                    type: "Adult",
                },
                {
                    price: 8.00,
                    type: "Child",
                }
            ],
            type: "Food Tour",
            isHot: true,
            discount: 10,
            features: [
                {
                    displayText: "English tour guide",
                    iconClass: "ion:mail"
                },
                {
                    displayText: "Take all best food in Ha Noi",
                    iconClass: "ion:mail"
                },
                {
                    displayText: "Easy to change date",
                    iconClass: "ion:mail"
                },
            ]
        }
    },
    {
        id: 2,
        attributes: {
            thumbnail: {
                url: "/images/products/sp1.jpg",
                width: 342,
                height: 250,
                name: "sss"
            },
            title: "Ha Noi food tour 1 day by Motocycle",
            slug: "ha-noi-food-tour-1-day-by-motocycle",
            prices: [
                {
                    price: 10.00,
                    type: "Adult",
                },
                {
                    price: 8.00,
                    type: "Child",
                }
            ],
            type: "Trekking Tour",
            isHot: true,
            discount: 20,
            features: [
                {
                    displayText: "English tour guide",
                    iconClass: "ion:mail"
                },
                {
                    displayText: "Take all best food in Ha Noi",
                    iconClass: "ion:mail"
                },
                {
                    displayText: "Easy to change date",
                    iconClass: "ion:mail"
                },
            ]
        }
    },
    {
        id: 1,
        attributes: {
            thumbnail: {
                url: "/images/products/sp1.jpg",
                width: 342,
                height: 250,
                name: "sss"
            },
            title: "Ha Noi food tour 1 day by Motocycle",
            slug: "ha-noi-food-tour-1-day-by-motocycle",
            prices: [
                {
                    price: 10.00,
                    type: "Adult",
                },
                {
                    price: 8.00,
                    type: "Child",
                }
            ],
            type: "Bus Tour",
            isHot: false,
            discount: 0,
            features: [
                {
                    displayText: "English tour guide",
                    iconClass: "ion:mail"
                },
                {
                    displayText: "Take all best food in Ha Noi",
                    iconClass: "ion:mail"
                },
                {
                    displayText: "Easy to change date",
                    iconClass: "ion:mail"
                },
            ]
        }
    }
];

const UniqueTourSlider = () => {

    return <Slider {...settings}>
        {data && data.map((item, idx) => {
            return <ProductCard key={`p_i${idx}`} item={item}/>
        })}
    </Slider>
};

const UniqueTour = ({dataSource = {}}) => {

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
                    <UniqueTourSlider/>
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