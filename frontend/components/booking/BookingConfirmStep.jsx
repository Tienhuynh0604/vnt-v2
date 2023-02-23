import React, {memo} from "react";
import {Button, Table} from "react-bootstrap";
import {Icon} from "@iconify/react";
import {toast} from "react-toastify";
import {useAppContext} from "../../layouts/AppLayout";
import {useTranslation} from "next-i18next";
import moment from "moment";
import {moneyFormat} from "../../ulti/helper";
import Router, {} from "next/router";
import {PATH_CHECK_OUT} from "../../ulti/appConst";

const BookingConfirmStep = ({productId, vnsPriceList, onBack, productData}) => {

    const {t} = useTranslation("common");
    const {setBookingModal, locale, setCartModal, setCheckOutItems} = useAppContext();

    const onCheckOut = async () => {
        try {
            const checkoutItem = {
                productData,
                vnsPriceList
            };

            setCheckOutItems([checkoutItem]);
            await Router.push(`/${PATH_CHECK_OUT}`);
            setBookingModal(prev => ({
                ...prev,
                isVisible: false
            }));
        } catch (e) {
            console.error(e);
            toast(e.message, {
                type: "error"
            })
        }
    };

    const onAddToCart = () => {
        try {
            let productKey = vnsPriceList.priceList.map(item => item.price_id);
            productKey.sort((a, b) => a - b);
            let cartItem = {
                key: `${vnsPriceList.router_id}_${productKey.join('_')}`,
                productId,
                productData,
                vnsPriceList,
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
        return vnsPriceList?.priceList?.map((item, idx) => {
            return (
                <tr key={`pl_${item.price_id}`}>
                    <td className="ps-2">
                        {t(`ageGroup${item.age_group}`)}
                    </td>
                    <td>
                        {item.quantity} x {locale === "en" ? moneyFormat(item.usd_price, locale)
                        : moneyFormat(item.price, locale)}
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
    };

    const renderTotalPrice = () => {
        let total = 0;
        vnsPriceList?.priceList?.forEach(item => {
            total += (locale === "en" ? item.usd_price : item.price) * item.quantity;
        });
        return total;
    };

    return <div className="booking-form-wrap">
        <h1 className="h1-title"><span>{t("booking.t1")}</span></h1>
        <Table className="mt-4 booking-table" striped responsive>
            <tbody>
            <tr>
                <th>{productData?.attributes?.title}</th>
                <th className="text-end"></th>
            </tr>
            <tr>
                <td>
                    {t("date")}
                </td>
                <td className="text-end ">
                    <strong>{moment().format("DD/MM/YYYY")}</strong>
                </td>
            </tr>
            <tr>
                <td>
                    {t("type")}
                </td>
                <td className="text-end ">
                    <strong>{locale === "en" ? vnsPriceList.optName_en : vnsPriceList.optName}</strong>
                </td>
            </tr>
            </tbody>
        </Table>
        <Table className="booking-table" striped responsive>
            <thead>
            <tr>
                <th>{t("ticket")}</th>
                <th className="">{t("quantity")}</th>
                <th className="text-end  pe-2">{t("price")}</th>
            </tr>
            </thead>
            <tbody>
            {renderPriceList()}
            </tbody>
        </Table>
        <div className="d-flex justify-content-between">
            <strong>{t("subtotal")}:</strong>
            <span className="sub-total  pe-2">{moneyFormat(renderTotalPrice(), locale)}</span>
        </div>
        <div className="mt-3 d-flex justify-content-center booking-btn-list" style={{columnGap: "20px"}}>
            <Button type="button" variant="link" onClick={() => onBack()}
                    className="px-md-5 py-md-2">
                <span className="d-none d-md-block">{t("back")}</span>
                <Icon icon={"eva:arrow-ios-back-fill"} className="d-sm-block d-md-none" height={24}/>
            </Button>
            <Button type="button"
                    onClick={() => onCheckOut()}
                    variant="outline-primary"
                    className="px-md-3 py-md-2">
                {t("booking.t3")}
            </Button>
            <Button type="button"
                    className="cart-btn px-md-5 py-md-2"
                    onClick={() => {
                        onAddToCart();
                    }}
            >
                <span className="d-none d-lg-block">{t("booking.t4")}</span>
                <Icon icon={"bi:cart-plus-fill"} className="d-sm-block d-lg-none" height={24}/>
            </Button>
        </div>
    </div>
};

export default memo(BookingConfirmStep);