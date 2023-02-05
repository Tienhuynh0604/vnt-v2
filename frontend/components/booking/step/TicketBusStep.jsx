import React, {memo, useEffect, useState} from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import DatePicker from "react-datepicker";
import InputNumberPlusMinus from "../InputNumberPlusMinus";
import {callGet, moneyFormat} from "../../../ulti/helper";
import {toast} from "react-toastify";
import Skeleton from 'react-loading-skeleton';
import {useTranslation} from "next-i18next";
import {useAppContext} from "../../../layouts/AppLayout";

const TicketBusStep = ({
                           productId,
                           onClickNext,
                           priceList,
                           setPriceList,
                           productData,
                           setProductData
                       }) => {
    const {t} = useTranslation("common");
    const [isLoading, setIsLoading] = useState(true);
    const selectedAttributes = {};
    const {locale} = useAppContext();

    useEffect(() => {
        if (productId) {
            getPaymentDetail(productId).catch(e => console.error(e));
        }
    }, [productId]);

    const onSelectAttributes = (field, value) => {
        console.log(field, value);
        selectedAttributes[field] = value;
        updateProductList()
    };

    const onChangeItem = (product, count) => {
        console.log(product, count);
        const idx = priceList.findIndex(item => item.priceId === product.priceId);
        let newPriceList = [...priceList];
        if (idx > -1) {
            newPriceList[idx] = {
                ...newPriceList[idx],
                quantity: count
            };
        }
        setPriceList(newPriceList);
    };

    const getPaymentDetail = async (productId) => {
        try {
            setIsLoading(true);
            console.log("getPaymentDetail");
            const res = await callGet(`/tours/payment-product/${productId}`);
            console.log(res.data);
            //Collect ticket Attributes
            const {priceList} = res.data.attributes;
            let attributes = {};
            let ps = [];
            priceList.forEach((item) => {
                let productKey = [];
                Object.keys(item).forEach(key => {
                    if (['price_id', 'price', 'usd_price', 'age_group'].indexOf(key) === -1 && item[key]) {
                        if (!attributes[key]) {
                            attributes[key] = [];
                        }
                        if (attributes[key].indexOf(item[key]) === -1) {
                            attributes[key].push(item[key]);
                        }
                        productKey.push(`${item[key]}`);
                        productKey.sort((a, b) => a - b);
                    }
                });
                ps.push({
                    itemKey: productKey.join("_"),
                    priceId: item.price_id,
                    ageGroup: item.age_group,
                    price: item.price,
                    usdPrice: item.usd_price,
                    rawProduct: item
                });
            });
            setProductData({
                rawProduct: res.data,
                products: ps,
                attributes
            });
        } catch (e) {
            toast(e.message, {
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const updateProductList = () => {
        let selectProductKey = [];
        Object.keys(selectedAttributes).forEach(key => {
            selectProductKey.push(selectedAttributes[key]);
        });
        selectProductKey.sort((a, b) => a - b);
        const filterProducts = [];
        productData.products.forEach(item => {
            if (item.itemKey === selectProductKey.join("_")) {
                filterProducts.push({
                    priceId: item.priceId,
                    product: item,
                    quantity: 0
                });
            }
        });
        console.log(filterProducts);
        setPriceList(filterProducts);
    };

    const renderPriceList = () => {
        return priceList
            .map((item, idx) => {
                console.log(item);
                return (
                    <tr key={`pl_${item.priceId}`}>
                        <td className="ps-2">
                            {t(`ageGroup${item.product.ageGroup}`)}
                        </td>
                        <td>
                            {locale === "en" ? moneyFormat(item.product.usdPrice, locale)
                                : moneyFormat(item.product.price, locale)}
                        </td>
                        <td>
                            <InputNumberPlusMinus product={item}
                                                  onChange={onChangeItem}
                                                  value={item.product.quantity}/>
                        </td>
                        <td className="text-end pe-2">
                            {locale === "en" ?
                                moneyFormat(item.product.usdPrice * item.quantity, locale)
                                : moneyFormat(item.product.price * item.quantity, locale)
                            }
                        </td>
                    </tr>
                )
            })
    };

    const renderTotalPrice = () => {
        let total = 0;
        priceList.forEach(item => {
            total += (locale === "en" ? item.product.usdPrice : item.product.price) * item.quantity;
        });
        return total;
    };

    return <div className="booking-form-wrap">
        {isLoading ? <Skeleton/> : <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="bookingDate">
                    <h5>{productData.rawProduct?.attributes.name}</h5>
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
                {Object.keys(productData?.attributes).map((key, idx) => {
                    if (key !== "age_group") {
                        return (
                            <Form.Group as={Row}
                                        key={`attr_${idx}`}
                                        className="align-items-center mb-3"
                                        controlId="bookingDate"
                            >
                                <Form.Label column sm="2">
                                    {t(key)}
                                </Form.Label>
                                <Col sm="10">
                                    <div key={`inline-radio`} className="">
                                        {productData.attributes[key].map((item, idx) => {
                                            return <Form.Check
                                                value={item}
                                                key={`attr${key}${idx}`}
                                                inline
                                                label={t(`${key}_${item}`)}
                                                name={`group${key}`}
                                                type={"radio"}
                                                id={`inline-radio-${key}-${idx}`}
                                                onChange={() => onSelectAttributes(key, item)}
                                            />
                                        })}
                                    </div>
                                </Col>
                            </Form.Group>
                        )
                    }
                })}
                <Table className="booking-table" striped responsive>
                    <thead>
                    <tr>
                        <th>Ticket</th>
                        <th>Price</th>
                        <th className="">Quantity</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderPriceList()}
                    </tbody>
                </Table>
            </Form>
            <div className="text-end">
                <strong>Sub total:</strong> <span className="sub-total">
                {moneyFormat(renderTotalPrice(), locale)}
            </span>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <Button type="button"
                        disabled={renderTotalPrice() <= 0}
                        onClick={() => onClickNext(priceList)}
                        className="px-5 py-2">
                    {t("Next")}
                </Button>
            </div>
        </>}
    </div>
};

export default TicketBusStep;