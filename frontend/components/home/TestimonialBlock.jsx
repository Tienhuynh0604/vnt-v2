import React, { memo } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { nl2br, SlickNextArrow, SlickPrevArrow } from "../../ulti/appUtil";
import Slider from "@ant-design/react-slick";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getImageUrl } from "../../ulti/helper";

const TestimonialBlock = ({ dataSource = [] }) => {
    console.log(dataSource);
    const { t } = useTranslation("common");

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        lazyLoad: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        nextArrow: <SlickNextArrow />,
        prevArrow: <SlickPrevArrow />,
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
            {dataSource && dataSource.map((item, idx) => {
                return <div key={`t_s_${idx}`}>
                    <div className="testimonial-item">
                        <Image src={getImageUrl(item.avatar?.data?.attributes?.url)}
                            alt={item.avatar?.data?.attributes?.name}
                            width={160}
                            height={160}
                            className={"avatar"}
                        />
                        <div>
                            <div className="rating">
                                <Icon icon={"ant-design:star-filled"} width={20} height={20} />
                                <Icon icon={"ant-design:star-filled"} width={20} height={20} />
                                <Icon icon={"ant-design:star-filled"} width={20} height={20} />
                                <Icon icon={"ant-design:star-filled"} width={20} height={20} />
                                <Icon icon={"ant-design:star-filled"} width={20} height={20} />
                            </div>
                            <h6>{item.title}</h6>
                            <p dangerouslySetInnerHTML={{ __html: nl2br(item.content) }} />
                            <strong className="text-primary">{item.name}</strong>
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
            <TestimonialSlider />
        </Container>
    </section>
};

export default memo(TestimonialBlock);