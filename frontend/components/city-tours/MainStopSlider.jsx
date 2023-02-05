import Slider from "@ant-design/react-slick";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import React, {memo, useEffect, useState} from "react";
import {imgGalleries} from "../../data/FakeData";
import {nl2br, SlickNextArrow, SlickPrevArrow} from "../../ulti/appUtil";
import {Col, Row} from "react-bootstrap";
import {callGet, getImageUrl} from "../../ulti/helper";

const settingDes = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
};

const settings = {
    dots: false,
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
            breakpoint: 541,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const MainStopSlider = ({tourId}) => {
    const {t} = useTranslation("common");
    const [loading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);
    const [sliders, setSliders] = useState({
        nav1: null,
        nav2: null
    });

    let slider1 = React.useRef(null);
    let slider2 = React.useRef(null);

    useEffect(() => {
        getMainStops().catch(e => console.error(e));
    }, [tourId]);

    useEffect(() => {
        setSliders({
            nav1: slider1,
            nav2: slider2
        })
    }, [slider1, slider2]);

    const getMainStops = async () => {
        try{
            setLoading(true);
            const res = await callGet(`/tours/places/${tourId}`);
            setPlaces(res.data);
        }catch (e) {
            throw e;
        }finally {
            setLoading(false);
        }
    };


    return <Row className="main-stops">
        <Col xs={12}>
            <Slider {...settings} ref={slider => slider2 = slider} asNavFor={sliders.nav1}>
                {places && places.map((item, idx) => (
                    <div key={`si-${idx}`}>
                        <div className="main-stops-item">
                            <Image
                                alt={item.thumb?.name}
                                fill
                                src={getImageUrl(item.thumb?.url)}
                            />
                            <h5>{item.name}</h5>
                        </div>
                    </div>
                ))}
            </Slider>
        </Col>
        <Col xs={12}>
            <Slider {...settingDes} ref={slider => slider1 = slider} asNavFor={sliders.nav2}>
                {places && places.map((item, idx) => (
                    <div key={`si2-${idx}`}>
                        <h5 className='mt-3'>{item.name}</h5>
                        <div dangerouslySetInnerHTML={{
                            __html: item.content
                        }}/>
                    </div>
                ))}
            </Slider>
        </Col>
    </Row>
};

export default memo(MainStopSlider);