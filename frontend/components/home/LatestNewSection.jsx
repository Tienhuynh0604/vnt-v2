import React, {memo, useEffect, useState} from "react";
import {useAppContext} from "../../layouts/AppLayout";
import {Container} from "react-bootstrap";
import {useTranslation} from "next-i18next";
import {nl2br, SlickNextArrow, SlickPrevArrow} from "../../ulti/appUtil";
import Slider from "@ant-design/react-slick";
import Image from "next/image";
import {formatDate} from "../../ulti/helper";

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

const data = [
    {
        id: 1,
        attributes: {
            title: "Vaccination & Parasite control",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            createdAt: "2022-10-05",
            thumb: {
                url: "/images/news/new1.jpg",
                name: "new1",
                width: 431,
                height: 344
            }
        }
    },
    {
        id: 1,
        attributes: {
            title: "Vaccination & Parasite control",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            createdAt: "2022-10-05",
            thumb: {
                url: "/images/news/new2.jpg",
                name: "new1",
                width: 431,
                height: 344
            }
        }
    },
    {
        id: 1,
        attributes: {
            title: "Vaccination & Parasite control",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            createdAt: "2022-10-05",
            thumb: {
                url: "/images/news/new3.jpg",
                name: "new1",
                width: 431,
                height: 344
            }
        }
    }
];

const LatestNewBlock = () => {

    const {t} = useTranslation("common");
    const {locale = 'vi'} = useAppContext();
    const [articles, setArticles] = useState([]);

    const LatestSlider = () => {
        return <Slider {...settings}>
            {data && data.map((item, idx) => {
                return <div key={`lns_${idx}`} className="news-item">
                    <Image src={item.attributes.thumb.url}
                           alt={item.attributes.thumb.name}
                           width={item.attributes.thumb.width}
                           height={item.attributes.thumb.height}
                           className="w-100"
                    />
                    <div className="info mt-4">
                        <div className="date">
                            <div className="day">{formatDate(item.attributes.createdAt, "DD")}</div>
                            <div className="month">{formatDate(item.attributes.createdAt, "MM")}</div>
                        </div>
                        <div className="detail">
                            <h4>{item.attributes.title}</h4>
                            <p dangerouslySetInnerHTML={{__html: nl2br(item.attributes.description)}}/>
                        </div>
                    </div>
                </div>
            })}
        </Slider>
    };

    return <section className="page-section">
        <Container>
            <h2>{t("our new feeds")}</h2>
            <h1 className="text-capitalize">{t("latest news update")}</h1>
            <div className="mb-5"/>
            <LatestSlider/>
        </Container>
    </section>
};

export default memo(LatestNewBlock);