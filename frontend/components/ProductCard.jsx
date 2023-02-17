import React from "react";
import {Button, Card} from "react-bootstrap";
import {getImageUrl, moneyFormat} from "../ulti/helper";
import {Icon} from "@iconify/react";
import Link from "next/link";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../layouts/AppLayout";

const ProductCard = ({destination, item, className}) => {
    const {t} = useTranslation("common");
    const {setBookingModal, locale} = useAppContext();

    const renderBookingButton = (hideBookingButton) => {
        if (!hideBookingButton) {
            return <Button type={"button"}
                           onClick={() => {
                               setBookingModal({
                                   isVisible: true,
                                   productId: item.id,
                                   item: {
                                       id: item.id
                                   }
                               });
                           }}
                           variant={'primary'}>
                {t("book.now")}
            </Button>
        } else {
            return <Button type={"button"}
                           onClick={() => {
                               setBookingModal({
                                   isVisible: true,
                                   bookingType: "contact",
                                   productName: item.attributes.tourCard?.title,
                                   destinationId: destination?.id,
                               });
                           }}
                           variant={'primary'}>
                {t("contactUs")}
            </Button>
        }
    };

    const renderTypeTag = (category) => {
        let color = "";
        switch (category?.data?.attributes.slug) {
            case "ticket-bus": {
                color = "bg-primary";
                break;
            }
            case "city-tour": {
                color = "bg-info";
                break;
            }
            default:
                color = "bg-warning";
        }
        return <span className={`p-tag text-light ${color}`}>
            {t(category?.data?.attributes.name)}
        </span>
    };

    return <div className={`product-card-item p-2 ${className}`}>
        <Card>
            <ul className="tag-list-1">
                {item.attributes.isHot &&
                <li>
                    <span className="p-tag p-tag-top bg-info text-light">{t("Tour hot")}</span>
                </li>
                }
                {
                    item.attributes.discountLabel &&
                    <li>
                        <span className="p-tag p-tag-top bg-danger text-light">
                            {item.attributes.discountLabel}
                        </span>
                    </li>
                }
            </ul>
            <Card.Img variant="top"
                      alt={item.attributes.tourCard?.image?.data?.attributes?.name}
                      src={getImageUrl(item.attributes.tourCard?.image?.data?.attributes?.url)}/>
            <Card.Body>
                <ul className="tag-list-2">
                    <li>
                        {renderTypeTag(item.attributes.category)}
                    </li>
                    {item?.attributes?.tags?.data.map((tag, idx) => {
                        return (<li key={`t_p${idx}`}>
                            <span
                                className={`p-tag text-light ${tag?.attributes.className}`}>
                            {t(tag?.attributes.name)}
                        </span>
                        </li>)
                    })}
                </ul>
                <Card.Title className="pt-2 line-1br">
                    <Link href={`/city-tours/${destination?.attributes.slug}/${item.attributes.slug}`}>
                        {item.attributes.tourCard?.title}
                    </Link>
                </Card.Title>
                <ul className="price">
                    <li>
                        {t("child")}: <strong>{moneyFormat(item.attributes.tourCard?.childPrice, locale)}</strong>
                    </li>
                    <li>
                        <div className="vr" style={{height: "100%"}}/>
                    </li>
                    <li>
                        {t("adult")}: <strong>{moneyFormat(item.attributes.tourCard?.adultPrice, locale)}</strong>
                    </li>
                </ul>
                <ul className="feature">
                    {item.attributes.tourCard?.features.map((f, idx) => {
                        return <li key={`uhf${idx}`} className={`${idx === 0 ? "line-2br": "line-1br"}`}>
                            <Icon icon={f.iconClass}/> {f.displayText}
                        </li>
                    })}
                </ul>
                <div className="d-flex justify-content-between pt-2">
                    <Link href={`/city-tours/${destination?.attributes.slug}/${item.attributes.slug}`}>
                        <Button type={"button"} variant={'outline-primary'}>{t("discover")}</Button>
                    </Link>
                    {renderBookingButton(item.attributes.hideBookingButton)}
                </div>
            </Card.Body>
        </Card>
    </div>
};

export default ProductCard;