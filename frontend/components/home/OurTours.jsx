import React, {memo, useState} from "react";
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
    const [currentTag, setCurrentTag] = useState(null);

    const onClickFilter = (desSlug) => {
        console.log(desSlug);
        setCurrentTag(desSlug);
    };

    return <section className="page-section our-tours-section">
        <Container style={{zIndex: 100}}>
            <div className="text-center">
                <h2 className="mt-4">{t("Our tour")}</h2>
                <h1 className="mb-4"><span>{t("Great choice to discover our city")}</span></h1>
            </div>
            <div className="d-flex justify-content-center text-center py-3">
                <ul className="destination list-inline">
                    <li key={`d_l_all`} className="list-inline-item">
                        <Button variant={"link"}
                                type="button"
                                onClick={() => onClickFilter(null)}
                        >
                            <span className="text-capitalize"> {t("all")}</span>
                        </Button>
                    </li>
                    {destinations().map((item, idx) => {
                        return <li key={`d_l_${idx}`} className="list-inline-item">
                            <Button type="button"
                                    onClick={() => onClickFilter(item.attributes.slug)}
                                    variant={"link"}>
                                {item.attributes.name}
                            </Button>
                        </li>
                    })}
                </ul>
            </div>
            <div className="product-card-list">
                {data.map((item, idx) => (
                    <ProductCard key={`p_c_${idx}`} item={item} className={
                        !currentTag || item.attributes.destination === currentTag ? "" : "hide-product"}/>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Link href={`/city-tours${currentTag ? `/${currentTag}` : ""}`}>
                    <Button variant="primary">View all <Icon icon={"bi:chevron-right"}/> </Button>
                </Link>
            </div>
        </Container>
        <DecorComponent/>
    </section>
};

export default memo(OurTours);