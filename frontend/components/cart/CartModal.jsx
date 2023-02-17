import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Button, Modal, Tab, Table, Tabs } from "react-bootstrap";
import { useAppContext } from "../../layouts/AppLayout";
import Link from "next/link";
import { Icon } from "@iconify/react";
import CartItem from "./CartItem";
import { PATH_CHECK_OUT } from "../../ulti/appConst";
import { moneyFormat } from "../../ulti/helper";
import { toast } from "react-toastify";
import Router from 'next/router';

const CartModal = () => {
    const { t } = useTranslation("common");
    const {
        cartModal,
        setCartModal,
        locale,
        setCheckOutItems
    } = useAppContext();
    const [selectedTab, setSelectedTab] = useState("carts");
    const [selectedItems, setSelectedItems] = useState([]);


    console.log(cartModal);

    const onHideModal = () => {
        setCartModal({
            ...cartModal,
            isVisible: false,
        })
    };

    const renderCartItems = () => {
        return cartModal.items.map((item, idx) => {
            return <CartItem addSelectedItem={addSelectedItem}
                removeSelectedItem={removeSelectedItem}
                item={item}
                key={`ci_${idx}`}
            />
        });
    };

    const getSubTotal = () => {
        console.log(selectedItems);
        if (selectedItems.length === 0) {
            return 0;
        }
        let total = 0;
        selectedItems.map(item => {
            let childTotal = 0;
            item.priceList.map(item2 => {
                childTotal += (locale === 'en' ? item2.usdPrice : item2.price) * item2.quantity;
            });
            total += childTotal;
        });
        return total;
    };

    const renderSubTotal = () => {
        const total = getSubTotal();
        return moneyFormat(total, locale);
    };

    const addSelectedItem = (key, product, addIfNotExisted = true) => {
        console.log("addSelectedItem", key, product);
        let newList = [...selectedItems];
        const idx = newList.findIndex(item => item.key === key);

        const addItem = {
            key,
            tourId: product.tour.id,
            priceList: product.priceList.map(i => ({
                priceId: i.priceId,
                quantity: i.quantity,
                usdPrice: i.usdPrice,
                price: i.price
            }))
        }

        console.log(addItem);

        if (idx > -1) {
            newList[idx] = addItem;
        } else {
            if (addIfNotExisted) {
                newList.push(addItem);
            }
        }
        console.log(newList);
        setSelectedItems(newList);
    };

    const removeSelectedItem = (key) => {
        console.log(key);
        let newList = [...selectedItems];
        setSelectedItems(newList.filter(item => {
            return item.key !== key;
        }))
    };

    const checkOut = async () => {
        if (selectedItems.length > 0 && getSubTotal() > 0) {
            setCheckOutItems(selectedItems);
            setCartModal(prev => ({
                ...prev,
                isVisible: false,
            }));
            await Router.push(`/${PATH_CHECK_OUT}`);
        } else {
            toast(t("check_out_no_product"), {
                type: "error"
            });
        }
    };

    const TabCarts = () => {
        return <Tab eventKey="carts" className="cart-tab" title={<>{t("cart")}</>}>
            <div className="px-4 py-2 pb-4">
                <small>{t("cart.t3", {
                    itemNum: cartModal.items.length
                })}
                </small>
                <Table className="booking-table" responsive>
                    <thead>
                        <tr>
                            <th>{t("product")}</th>
                            <th>{t("ticket")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartModal.items?.length > 0 ? renderCartItems() : <tr>
                            <td colSpan={2} className="text-center">
                                <i>{t("cart.t3")}</i>
                            </td>
                        </tr>}
                        <tr>
                            <td colSpan={2}>
                                <div className="d-flex justify-content-end">
                                    <strong>{t("Sub total")}:</strong>
                                    <span className="sub-total ms-3 text-danger">
                                        {renderSubTotal()}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className="mt-3 d-flex justify-content-center booking-btn-list" style={{ columnGap: "20px" }}>
                    <Button type="button"
                        variant="outline-primary"
                        className="px-md-3 py-md-2"
                        onClick={onHideModal}
                    >
                        <span className="d-none d-lg-block text-capitalize">{t("cart.t2")}</span>
                        <Icon icon={"eva:arrow-back-outline"} className="d-sm-block d-lg-none" height={24} />
                    </Button>
                    <Link href={`/${PATH_CHECK_OUT}`}
                        className={selectedItems.length === 0 ? "disabled-link" : ""}>
                        <Button type="button" disabled={selectedItems.length === 0}
                            onClick={() => checkOut()}
                            className="cart-btn px-md-5 py-md-2">
                            <span className="text-capitalize">{t("cart.t1")}</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </Tab>
    };

    return <Modal show={cartModal.isVisible}
        centered
        size="lg"
        onHide={onHideModal}>

        <Tabs
            defaultActiveKey={selectedTab}
            activeKey={selectedTab}
            onSelect={tab => setSelectedTab(tab)}
            justify
            id="modal-carts"
            className="mb-3"
        >
            {TabCarts()}
        </Tabs>
    </Modal>
};

export default memo(CartModal);