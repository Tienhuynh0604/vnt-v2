import React, {memo, useState} from "react";
import {useTranslation} from "react-i18next";
import {Col, Row, Container, Button} from "react-bootstrap";
import ProductCard from "../ProductCard";
import {Icon} from "@iconify/react";
import DecorComponent from "../DecorComponent";
import Link from "next/link";
import {useAppContext} from "../../layouts/AppLayout";

const OurTours = ({tours = []}) => {
    const {t} = useTranslation("common");
    const [currentTag, setCurrentTag] = useState(null);
    const {destinations = [], locale} = useAppContext();

    const onClickFilter = (desSlug) => {
        console.log(desSlug);
        setCurrentTag(desSlug);
    };

    return <section className="page-section our-tours-section">
        <Container style={{zIndex: 100}}>
            <div className="text-center">
                <h2 className="mt-4">{t("our.tour")}</h2>
                <h1 className="mb-4"><span>{t("our.tour.t2")}</span></h1>
            </div>
            <div className="d-flex justify-content-center text-center py-3">
                <ul className="destination list-inline">
                    <li key={`d_l_all`} className={`list-inline-item ${!currentTag ? "active" : ""}`}>
                        <Button variant={"link"}
                                type="button"
                                onClick={() => onClickFilter(null)}
                        >
                            <span className="text-capitalize"> {t("all")}</span>
                        </Button>
                    </li>
                    {destinations.map((item, idx) => {
                        return <li key={`d_l_${idx}`}
                                   className={`list-inline-item ${currentTag && currentTag === item.attributes.slug ? "active" : ""}`}>
                            <Button type="button"
                                    onClick={() => onClickFilter(item.attributes.slug)}
                                    variant={"link"}>
                                {locale === "en" ? item.attributes.name_en : item.attributes.name}
                            </Button>
                        </li>
                    })}
                </ul>
            </div>
            <div className="product-card-list">
                {tours?.map((item, idx) => (
                    <ProductCard key={`p_c_${idx}`}
                                 item={item}
                                 destination={item.attributes?.destination?.data}
                                 className={
                                     !currentTag || item.attributes?.destination?.data.attributes.slug === currentTag ? "" : "hide-product"
                                 }
                    />
                ))}
            </div>
            <div className="d-flex justify-content-center mt-5">
                {currentTag && <Link href={`/city-tours${currentTag ? `/${currentTag}` : ""}`}>
                    <Button variant="primary">{t("view.all")} <Icon icon={"bi:chevron-right"}/> </Button>
                </Link>}
            </div>
        </Container>
        <DecorComponent/>
    </section>
};

export default memo(OurTours);