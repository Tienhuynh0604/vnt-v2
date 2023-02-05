import React, {memo} from "react";
import {Button, Table} from "react-bootstrap";
import {Icon} from "@iconify/react";
import Link from "next/link";
import {toast} from "react-toastify";
import {useAppContext} from "../../layouts/AppLayout";
import {useTranslation} from "next-i18next";
import moment from "moment";
import {moneyFormat} from "../../ulti/helper";

const BookingConfirmStep = ({productData, productId, priceList, onBack}) => {

    console.log(priceList);
    const {t} = useTranslation("common");
    const {setBookingModal, locale, setCartModal} = useAppContext();

    const onAddToCart = () => {
        try {
            const attributes = {};
            let productKey = [];
            const temp = priceList[0].product.rawProduct;
            Object.keys(temp).forEach(key => {
                if (['price_id', 'price', 'usd_price', 'age_group'].indexOf(key) === -1
                    && temp[key]) {
                    if (!attributes[key]) {
                        attributes[key] = [];
                    }
                    if (attributes[key].indexOf(temp[key]) === -1) {
                        attributes[key].push(temp[key]);
                    }
                    productKey.push(`${temp[key]}`);
                    productKey.sort((a, b) => a - b);
                }
            });
            const pl = [];
            priceList.forEach(item => {
                pl.push({
                    priceId: item.priceId,
                    quantity: item.quantity
                })
            });

            const groupItem = {
                attributes,
                priceList: pl,
            };

            const cartItem = {
                id: productId,
                key: `${productId}_${productKey.join("_")}`,
                type: productData.attributes.type,
                routerId: productData.attributes.router_id,
                cityId: productData.attributes.city_id,
                item: groupItem
            };

            console.log("Add cart item", cartItem);

            setCartModal(prev => {
                const items = [...prev.items];
                const itemIdx = items.findIndex(item => item.key === cartItem.key);
                if (itemIdx > -1) {
                    items[itemIdx] = cartItem;
                } else {
                    items.push(cartItem);
                }
                return {
                    ...prev,
                    items,
                    isVisible: false
                }
            });
            setBookingModal(prev => ({
                ...prev,
                isVisible: false
            }));
            toast("Item added to Cart");
        } catch (e) {
            console.error(e);
            toast(e.message, {
                type: "error"
            })
        }
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
                            {item.quantity} x {locale === "en" ? moneyFormat(item.product.usdPrice, locale)
                            : moneyFormat(item.product.price, locale)}
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
        <h1 className="h1-title"><span>Ticket Information</span></h1>
        <Table className="mt-4 booking-table" striped responsive>
            <tbody>
            <tr>
                <th>{productData.rawProduct?.attributes.name}</th>
                <th className="text-end"></th>
            </tr>
            <tr>
                <td>
                    {t("Date")}
                </td>
                <td className="text-end ">
                    <strong>{moment().format("DD/MM/YYYY")}</strong>
                </td>
            </tr>
            </tbody>
        </Table>
        <Table className="booking-table" striped responsive>
            <thead>
            <tr>
                <th>Ticket</th>
                <th className="">Quantity</th>
                <th className="text-end  pe-2">Price</th>
            </tr>
            </thead>
            <tbody>
            {renderPriceList()}
            </tbody>
        </Table>
        <div className="d-flex justify-content-between">
            <strong>Sub total:</strong>
            <span className="sub-total  pe-2">{moneyFormat(renderTotalPrice(), locale)}</span>
        </div>
        <div className="mt-3 d-flex justify-content-center booking-btn-list" style={{columnGap: "20px"}}>
            <Button type="button" variant="link" onClick={() => onBack()}
                    className="px-md-5 py-md-2">
                <span className="d-none d-md-block">Back</span>
                <Icon icon={"eva:arrow-ios-back-fill"} className="d-sm-block d-md-none" height={24}/>
            </Button>
            <Link href="/check-out"
                  onClick={() => {
                      setBookingModal(prevState => ({
                          ...prevState,
                          isVisible: false
                      }));
                  }}
            >
                <Button type="button" variant="outline-primary" className="px-md-3 py-md-2">
                    {t("Check out now")}
                </Button>
            </Link>
            <Button type="button"
                    className="cart-btn px-md-5 py-md-2"
                    onClick={() => {
                        onAddToCart();
                    }}
            >
                <span className="d-none d-lg-block">{t("Add to cart")}</span>
                <Icon icon={"bi:cart-plus-fill"} className="d-sm-block d-lg-none" height={24}/>
            </Button>
        </div>
    </div>
};

export default memo(BookingConfirmStep);