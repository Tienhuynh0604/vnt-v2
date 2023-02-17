import React, {useEffect, useState} from "react";
import Skeleton from 'react-loading-skeleton';
import {callGet, moneyFormat} from "../../ulti/helper";
import {useAppContext} from "../../layouts/AppLayout";
import {useTranslation} from "next-i18next";
import moment from "moment";

const CheckoutItem = ({item}) => {
    const [loading, setLoading] = useState(true);
    const {locale} = useAppContext();
    const [tour, setTour] = useState(null);
    const [priceList, setPriceList] = useState([]);
    const {t} = useTranslation("common");

    useEffect(() => {
        if (item) {
            getProductInfo().catch(e => console.error(e));
        }
    }, [item]);

    const getProductInfo = async () => {
        try {
            console.log("Loading product");
            setLoading(true);
            const res = await callGet(`/tours/${item.tourId}`, {
                fields: ['title', 'slug'],
                pagination: {
                    page: 1,
                    pageSize: 1
                },
            }, locale, true);
            const res2 = await callGet(`/tours/payment-product/${item.tourId}`);
            setTour(res.data);
            let priceListTemp = item.item.priceList;
            const priceListRes = res2.data.attributes.priceList;
            console.log("getProductInfo", res.data, res2.data, priceListTemp);
            for (let i = 0; i < priceListTemp.length; i++) {
                for (let j = 0; j < priceListRes.length; j++) {
                    if (priceListTemp[i].priceId === priceListRes[j].price_id) {
                        priceListTemp[i] = {
                            ...priceListTemp[i],
                            price: priceListRes[j].price,
                            usdPrice: priceListRes[j].usd_price,
                            ageGroup: priceListRes[j].age_group
                        };
                        break;
                    }
                }
            }
            priceListTemp.sort((a, b) => b - a);
            setPriceList(priceListTemp);
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    const getItemAttributesArr = () => {
        return Object.keys(item.item.attributes).map((key, idx) => {
            return t(`${key}_${item?.item.attributes[key]}`)
        });
    };

    const renderItemAttributes = () => {
        const itemAttrs = getItemAttributesArr();
        return <div className="d-flex justify-content-start align-items-center">
            {itemAttrs.map((item, idx) => {
                return <small key={`${item}${idx}`}>{item}</small>
            })}
        </div>
    };

    const renderCheckOutItem = () => {
        return <div className='product-item'>
            <h6 className="fw-bold">{tour.attributes.title}</h6>
            <div className="check-out-row">
                <span className="title">{t("date")}</span>
                <span className="value">{moment().format("DD/MM/YYYY")}</span>
            </div>
            <div className="check-out-row">
                <span className="title">{t("type")}</span>
                <span className="value">{renderItemAttributes()}</span>
            </div>
            <div className="check-out-row">
                <span className="title">{t("quantity")}</span>
            </div>
            {priceList.map(pl => {
                return <div className="check-out-row">
                    <span className="title">- {t(`ageGroup${pl.ageGroup}`)}</span>
                    <span className="value">
                        {pl.quantity} x {moneyFormat(locale === "en" ? pl.usdPrice : pl.price, locale)}
                    </span>
                </div>
            })}
        </div>
    };

    return loading ? (
        <p><Skeleton count={3}/></p>
    ) : (renderCheckOutItem())
};

export default CheckoutItem;