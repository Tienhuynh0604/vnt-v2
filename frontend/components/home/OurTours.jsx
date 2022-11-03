import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {Col, Row, Container, Button} from "react-bootstrap";
import ProductCard from "../ProductCard";
import {Icon} from "@iconify/react";
import Image from "next/image";

const destinations = () => {
    return [
        {
            id: 1,
            attributes: {
                name: "Hà Nội",
                slug: "ha-noi",
            }
        },
        {
            id: 2,
            attributes: {
                name: "Huế",
                slug: "hue",
            }
        },
        {
            id: 3,
            attributes: {
                name: "Hạ Long",
                slug: "ha-long",
            }
        },
        {
            id: 4,
            attributes: {
                name: "Hồ chí minh",
                slug: "ho-chi-minh",
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

const OurTours = ({dataSource = {}}) => {
    const {t} = useTranslation("common");

    return <section className="page-section our-tours-section">
        <Container style={{zIndex: 100}}>
            <div className="text-center">
                <h2 className="mt-4">{t("Our tour")}</h2>
                <h1 className="mb-4"><span>{t("Great choice to discover our city")}</span></h1>
            </div>
            <div className="d-flex justify-content-center text-center py-3">
                <ul className="destination list-inline">
                    <li key={`d_l_all`} className="list-inline-item active">
                        <Button variant={"link"}>
                            Tất cả
                        </Button>
                    </li>
                    {destinations().map((item, idx) => {
                        return <li key={`d_l_${idx}`} className="list-inline-item">
                            <Button variant={"link"}>
                                {item.attributes.name}
                            </Button>
                        </li>
                    })}
                </ul>
            </div>
            <Row>
                {data.map((item, idx) => (
                    <Col key={`p-c${idx}`} xs={12} md={6} lg={3}>
                        <ProductCard item={item}/>
                    </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-center mt-5">
                <Button variant="primary">View all <Icon icon={"bi:chevron-right"}/> </Button>
            </div>
        </Container>
        <Image src="/images/Frame-2.png"
               width={658}
               height={522}
               className="position-absolute"
               alt={"vn-sightseeing"}
               style={{
                   left: 0,
                   bottom: 0,
                   maxWidth: "50%",
                   zIndex: -1,
                   height: "auto"
               }}
        />
        <Image src="/images/Frame-1.png"
               width={658}
               height={522}
               className="position-absolute"
               alt={"vn-sightseeing"}
               style={{
                   right: 0,
                   bottom: 0,
                   maxWidth: "50%",
                   zIndex: -1,
                   height: "auto"
               }}
        />
    </section>
};

export default memo(OurTours);