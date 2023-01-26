import Slider from "@ant-design/react-slick";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import React, {memo, useEffect, useState} from "react";
import {imgGalleries} from "../../data/FakeData";
import {nl2br, SlickNextArrow, SlickPrevArrow} from "../../ulti/appUtil";
import {Col, Row} from "react-bootstrap";
import {getImageUrl} from "../../ulti/helper";

const settingDes = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
};

const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SlickNextArrow/>,
    prevArrow: <SlickPrevArrow/>,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const PopularDestination = ({places = []}) => {
    const {t} = useTranslation("common");
    const [sliders, setSliders] = useState({
        nav1: null,
        nav2: null
    });

    let slider1 = React.useRef(null);
    let slider2 = React.useRef(null);

    useEffect(() => {
        setSliders({
            nav1: slider1,
            nav2: slider2
        })
    }, [slider1, slider2]);

    return <Row className="popular-destination">
        <Col xs={12} md={3}>
            <h1 className="text-capitalize">{t("popular destination")}</h1>
            <Slider {...settingDes} ref={slider => slider1 = slider} asNavFor={sliders.nav2}>
                {places && places.map((item, idx) => (
                    <div key={`si2-${idx}`}>
                        <h4>{item.title}</h4>
                        <p>
                            {item.subTitle}
                        </p>
                    </div>
                ))}
            </Slider>
        </Col>
        <Col xs={12} md={9}>
            <Slider {...settings} ref={slider => slider2 = slider} asNavFor={sliders.nav1}>
                {places && places.map((item, idx) => (
                    <div key={`si-${idx}`}>
                        <div className="popular-destination-item">
                            <Image
                                alt={item.image.data.attributes.name}
                                fill
                                objectFit="cover"
                                src={getImageUrl(item.image.data.attributes.url)}
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </Col>
    </Row>
};

export default memo(PopularDestination);