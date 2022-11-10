import React from "react";
import {Button, Card} from "react-bootstrap";
import {moneyFormat} from "../ulti/helper";
import {Icon} from "@iconify/react";
import Link from "next/link";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../layouts/AppLayout";

const ProductCard = ({item}) => {
    const {t} = useTranslation("common");
    const {setBookingModal} = useAppContext();

    const renderTypeTag = (type) => {
        let colorType = "";

        switch (type) {
            case "Trekking Tour":
                colorType = "bg-warning";
                break;
            case "Bus Tour":
                colorType = "bg-primary";
                break;
            case "Motorcycle Tour":
                colorType = "bg-danger";
                break;
            default:
                colorType = "bg-info";
                break;
        }

        return <span className={`p-tag text-light ${colorType}`}>
            {t(type)}
        </span>
    };

    return <div className="product-card-item p-2">
        <Card>
            <ul className="tag-list-1">
                {item.attributes.isHot &&
                <li>
                    <span className="p-tag p-tag-top bg-info text-light">{t("Tour hot")}</span>
                </li>
                }
                {
                    item.attributes.discount > 0 &&
                    <li>
                        <span className="p-tag p-tag-top bg-danger text-light">{item.attributes.discount}%</span>
                    </li>
                }
            </ul>
            <Card.Img variant="top" src={item.attributes.thumbnail?.url}/>
            <Card.Body>
                <ul className="tag-list-2">
                    <li>
                        {renderTypeTag(item.attributes.type)}
                    </li>
                </ul>
                <Card.Title className="pt-2">
                    {item.attributes.title}
                </Card.Title>
                <ul className="price">
                    {item.attributes.prices.map((pI, idx) => {
                        return <li key={`u_p${idx}`}>
                            {pI.type}: <strong>{moneyFormat(pI.price)}</strong>
                        </li>
                    })}
                </ul>
                <ul className="feature">
                    {item.attributes.features.map((f, idx) => {
                        return <li key={`uhf${idx}`}>
                            <Icon icon={f.iconClass}/> {f.displayText}
                        </li>
                    })}
                </ul>
                <div className="d-flex justify-content-between pt-2">
                    <Link href={`/city-tours/ha-noi/${item.attributes.slug}`}>
                        <Button type={"button"} variant={'outline-primary'}>{t("discover")}</Button>
                    </Link>
                    <Button type={"button"}
                            onClick={() => {
                                setBookingModal({
                                    isVisible: true,
                                    item: {
                                        id: 1
                                    }
                                });
                            }}
                            variant={'primary'}>
                        {t("book now")}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    </div>
};

export default ProductCard;
