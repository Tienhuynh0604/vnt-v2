import React, {memo, useEffect, useState} from "react";
import {Container, Col, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {nl2br, SlickNextArrow, SlickPrevArrow} from "../../ulti/appUtil";
import Slider from "@ant-design/react-slick";
import Image from "next/image";
import {Icon} from "@iconify/react";

const TestimonialBlock = ({dataSource = {}}) => {
    const {t} = useTranslation("common");

    const data = [
        {
            id: 1,
            attributes: {
                avatar: "/images/testimonial/ava1.jpg",
                title: "Great way to explore Hanoi",
                content: "We took a sightseeing tour which featured most of the notable places of the city. The audio commentary was very interested and Ly, the guide on board was very helpful and nice.\n" +
                    "The not-so-little gems of our route presenting Hanoi’s proudest",
                name: "Sara Adams"
            }
        },
        {
            id: 2,
            attributes: {
                avatar: "/images/testimonial/ava2.jpg",
                title: "Great way to explore Hanoi",
                content: "We took a sightseeing tour which featured most of the notable places of the city. The audio commentary was very interested and Ly, the guide on board was very helpful and nice.\n" +
                    "The not-so-little gems of our route presenting Hanoi’s proudest",
                name: "Sara Adams"
            }
        }
    ];

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
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const TestimonialSlider = () => {
        return <Slider {...settings}>
            {data && data.map((item, idx) => {
                return <div key={`t_s_${idx}`}>
                    <div className="testimonial-item">
                        <Image src={item.attributes.avatar} alt={"vn-sightseeing"}
                               width={160}
                               height={160}
                               className={"avatar"}
                        />
                        <div>
                            <div className="rating">
                                <Icon icon={"ant-design:star-filled"} width={20} height={20}/>
                                <Icon icon={"ant-design:star-filled"} width={20} height={20}/>
                                <Icon icon={"ant-design:star-filled"} width={20} height={20}/>
                                <Icon icon={"ant-design:star-filled"} width={20} height={20}/>
                                <Icon icon={"ant-design:star-filled"} width={20} height={20}/>
                            </div>
                            <h6>{item.attributes.title}</h6>
                            <p dangerouslySetInnerHTML={{__html: nl2br(item.attributes.content)}}/>
                            <strong className="text-primary">{item.attributes.name}</strong>
                        </div>
                    </div>
                </div>
            })}
        </Slider>
    };

    return <section className="page-section unique-section bg-grey">
        <Container>
            <div className="text-center mb-4">
                <h1 className="text-capitalize">{t("testimonial.t1")}</h1>
                <h2 className="mt-2">{t("testimonial.t2")}</h2>
            </div>
            <TestimonialSlider/>
        </Container>
    </section>
};

export default memo(TestimonialBlock);