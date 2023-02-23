import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import DatePicker from "react-datepicker";
import InputNumberPlusMinus from "../InputNumberPlusMinus";
import {callGet, moneyFormat} from "../../../ulti/helper";
import {toast} from "react-toastify";
import Skeleton from 'react-loading-skeleton';
import {useTranslation} from "next-i18next";
import {useAppContext} from "../../../layouts/AppLayout";

const TicketBusStep = ({
                           productData,
                           productId,
                           onClickNext,
                           setProductData
                       }) => {
    const {t} = useTranslation("common");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPriceList, setSelectedPriceList] = useState([]);
    const {locale} = useAppContext();

    useEffect(() => {
        if (productId) {
            getTourDetail(productId).catch(e => console.error(e));
        }
    }, [productId]);

    const onSelectAttributes = (value) => {
        setSelectedPriceList(value);
    };

    const onChangeItem = (product, count) => {
        const idx = selectedPriceList.priceList.findIndex(item => item.price_id === product.price_id);
        let newPriceList = [...selectedPriceList.priceList];
        if (idx > -1) {
            newPriceList[idx] = {
                ...newPriceList[idx],
                quantity: count
            };
        }
        setSelectedPriceList({
            ...selectedPriceList,
            priceList: newPriceList
        })
    };

    const getTourDetail = async (productId) => {
        try {
            setIsLoading(true);
            const res = await callGet(`/tours/${productId}`, {
                fields: ['title', 'slug', 'vnsPriceList'],
                pagination: {
                    page: 1,
                    pageSize: 1
                },
            }, locale, true);
            const tour = res.data;
            setProductData(tour);
            // await getPaymentDetail(productId, tour);
        } catch (e) {
            console.error(e);
            toast(e.message, {
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    // const getPaymentDetail = async (productId, tour) => {
    //     try {
    //         console.log("getPaymentDetail");
    //         const res = await callGet(`/tours/payment-product/${productId}`);
    //         //Collect ticket Attributes
    //         const {priceList} = res.data.attributes;
    //         let attributes = {};
    //         let ps = [];
    //         priceList.forEach((item) => {
    //             let productKey = [];
    //             Object.keys(item).forEach(key => {
    //                 if (['price_id', 'price', 'usd_price', 'age_group'].indexOf(key) === -1 && item[key]) {
    //                     if (!attributes[key]) {
    //                         attributes[key] = [];
    //                     }
    //                     if (attributes[key].indexOf(item[key]) === -1) {
    //                         attributes[key].push(item[key]);
    //                     }
    //                     productKey.push(`${item[key]}`);
    //                     productKey.sort((a, b) => a - b);
    //                 }
    //             });
    //             ps.push({
    //                 itemKey: productKey.join("_"),
    //                 priceId: item.price_id,
    //                 ageGroup: item.age_group,
    //                 price: item.price,
    //                 usdPrice: item.usd_price,
    //                 rawProduct: item
    //             });
    //         });
    //         setProductData({
    //             rawProduct: res.data,
    //             products: ps,
    //             attributes,
    //             tour
    //         });
    //     } catch (e) {
    //         console.error(e);
    //         throw e;
    //     }
    // };

    // const updateProductList = () => {
    //     let selectProductKey = [];
    //     Object.keys(selectedAttributes).forEach(key => {
    //         selectProductKey.push(selectedAttributes[key]);
    //     });
    //     selectProductKey.sort((a, b) => a - b);
    //     const filterProducts = [];
    //     productData.products.forEach(item => {
    //         if (item.itemKey === selectProductKey.join("_")) {
    //             filterProducts.push({
    //                 priceId: item.priceId,
    //                 product: item,
    //                 quantity: 0
    //             });
    //         }
    //     });
    //     console.log(filterProducts);
    //     setPriceList(filterProducts);
    // };

    const renderPriceList = () => {
        return selectedPriceList?.priceList?.map((item, idx) => {
            return (
                <tr key={`pl_${item.priceId}`}>
                    <td className="ps-2">
                        {t(`ageGroup${item.age_group}`)}
                    </td>
                    <td>
                        {locale === "en" ? moneyFormat(item.usd_price, locale)
                            : moneyFormat(item.price, locale)}
                    </td>
                    <td>
                        <InputNumberPlusMinus product={item}
                                              onChange={onChangeItem}
                                              value={item.quantity}/>
                    </td>
                    <td className="text-end pe-2">
                        {locale === "en" ?
                            moneyFormat(item.usd_price * item.quantity, locale)
                            : moneyFormat(item.price * item.quantity, locale)
                        }
                    </td>
                </tr>
            )
        })
        // return "";
    };

    const renderTotalPrice = () => {
        let total = 0;
        selectedPriceList?.priceList?.forEach(item => {
            total += (locale === "en" ? item.usd_price : item.price) * item.quantity;
        });
        return total;
    };

    return <div className="booking-form-wrap">
        {isLoading ? <p><Skeleton count={3}/></p> : <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="bookingDate">
                    <h5>{productData?.attributes?.title}</h5>
                    <Form.Label column sm="2">
                        {t("Choose date")}
                    </Form.Label>
                    <Col sm="10">
                        <DatePicker
                            selected={new Date()}
                            dateFormat={"dd/MM/yyyy"}
                            placeholder="dd/mm/yyyy"
                            className="form-control"
                            minDate={new Date()}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="bookingDate">
                    <Form.Label column sm="2">
                        {t("type")}
                    </Form.Label>
                    <Col sm="10">
                        {productData?.attributes?.vnsPriceList && productData.attributes.vnsPriceList.map((item, idx) => {
                            return (
                                <Form.Check
                                    value={item}
                                    key={`attr${idx}`}
                                    inline
                                    label={locale === "en" ? item.optName_en : item.optName}
                                    name={`groupAttribute`}
                                    type={"radio"}
                                    id={`inline-radio-${idx}`}
                                    onChange={() => onSelectAttributes(item)}
                                />
                            )
                        })}
                    </Col>
                </Form.Group>
                <Table className="booking-table" striped responsive>
                    <thead>
                    <tr>
                        <th>{t("ticket")}</th>
                        <th>{t("price")}</th>
                        <th className="">{t("quantity")}</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderPriceList()}
                    </tbody>
                </Table>
            </Form>
            <div className="text-end">
                <strong>{t("subtotal")}:</strong> <span className="sub-total">
                {moneyFormat(renderTotalPrice(), locale)}
            </span>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <Button type="button"
                        disabled={renderTotalPrice() <= 0}
                        onClick={() => onClickNext(selectedPriceList)}
                        className="px-5 py-2">
                    {t("next")}
                </Button>
            </div>
        </>}
    </div>
};

export default TicketBusStep;