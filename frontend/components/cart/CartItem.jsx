import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import InputNumberPlusMinus from "../booking/InputNumberPlusMinus";
import Skeleton from 'react-loading-skeleton';
import {callGet, getImageUrl, imagePopulate, moneyFormat} from "../../ulti/helper";
import {useAppContext} from "../../layouts/AppLayout";
import {PATH_CITY_TOURS} from "../../ulti/appConst";
import {useTranslation} from "next-i18next";

const CartItem = ({item, addSelectedItem, removeSelectedItem}) => {
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
            const res = await callGet(`/tours/${item.id}`, {
                fields: ['title', 'slug'],
                populate: {
                    destination: {
                        fields: ['name', 'slug']
                    },
                    tourCard: {
                        populate: {
                            image: imagePopulate(),
                        }
                    },
                },
                pagination: {
                    page: 1,
                    pageSize: 1
                },
            }, locale, true);
            const res2 = await callGet(`/tours/payment-product/${item.id}`);
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

    const renderThumbnail = () => {
        if (tour?.attributes?.tourCard?.image?.data) {
            const {formats, url, name} = tour?.attributes?.tourCard?.image?.data.attributes;
            return <Image src={formats?.thumbnail?.url ? getImageUrl(formats?.thumbnail?.url)
                : getImageUrl(url)}
                          alt={name}
                          fill
            />;
        } else {
            return "";
        }
    };

    const onChangeItem = (item, count) => {
        console.log(item, count);
        const newList = [...priceList];
        const idx = newList.findIndex(item2 => item2.priceId === item.priceId);
        if (idx > -1) {
            newList[idx].quantity = count;
            setPriceList(newList);
        }
        const productKey = genKeyProduct();
        const itemAttrs = getItemAttributesArr();
        addSelectedItem(productKey, {
            key: productKey,
            tour,
            itemAttrs,
            priceList: newList
        }, false);
    };

    const genKeyProduct = () => {
        const keyList = priceList.map(pL => pL.priceId);
        keyList.sort((a, b) => b - a);
        return `${tour.id}${keyList.join("_")}`;
    };

    const renderPriceList = () => {
        return <>
            {priceList.map((item, idx) => {
                return <div className="sub-variant" key={`pl${idx}`}>
                    <span>{t(`ageGroup${item.ageGroup}`)}: <strong>{locale === "en" ? moneyFormat(item.usdPrice, locale)
                        : moneyFormat(item.price, locale)}</strong></span>
                    <InputNumberPlusMinus value={item.quantity}
                                          product={item}
                                          onChange={onChangeItem}/>
                </div>
            })}
        </>
    };

    return loading ? (
        <tr>
            <td colSpan={2}>
                <p><Skeleton count={3}/></p>
            </td>
        </tr>
    ) : (<tr className="cart-item">
        <td>
            <div className="d-flex justify-content-start align-items-center">
                <Form>
                    <Form.Check
                        className="ms-1"
                        inline
                        name="sp1"
                        type={"checkbox"}
                        onChange={(e) => {
                            console.log(e.target.checked, tour, priceList);
                            const productKey = genKeyProduct();
                            if (e.target.checked) {
                                const itemAttrs = getItemAttributesArr();
                                addSelectedItem(productKey, {
                                    key: productKey,
                                    tour,
                                    itemAttrs,
                                    priceList
                                });
                            } else {
                                removeSelectedItem(productKey)
                            }
                        }}
                    />
                </Form>
                <div className="image-thumb small">
                    {renderThumbnail()}
                </div>
            </div>
        </td>
        <td className="ps-1">
            <div className="ms-1">
                <div className="cart-item-title">
                    <Link
                        href={`/${PATH_CITY_TOURS}/${tour?.attributes?.destination?.data?.attributes.slug}/${tour?.attributes?.slug}`}>
                        <h6 className="ellipsis-1 mb-0">
                            <strong>{tour?.attributes?.title}</strong>
                        </h6>
                    </Link>
                    {renderItemAttributes()}
                </div>
                {renderPriceList()}
            </div>
        </td>
    </tr>)
};

export default CartItem;