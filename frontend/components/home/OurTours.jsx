import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {Col, Row, Container, Button} from "react-bootstrap";
import ProductCard from "../ProductCard";
import {Icon} from "@iconify/react";
import DecorComponent from "../DecorComponent";
import {OurTourData} from "../../data/FakeData";
import Link from "next/link";

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

const data = OurTourData;

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
                    <Col key={`p-c${idx}`} xs={12} md={6} lg={4} xxl={3}>
                        <ProductCard item={item}/>
                    </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-center mt-5">
                <Link href={"/city-tours/ha-noi"}>
                    <Button variant="primary">View all <Icon icon={"bi:chevron-right"}/> </Button>
                </Link>
            </div>
        </Container>
        <DecorComponent/>
    </section>
};

export default memo(OurTours);