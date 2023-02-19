import React, {memo, useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {Button, Modal, Tab, Table, Tabs} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import Link from "next/link";
import {Icon} from "@iconify/react";
import CartItem from "./CartItem";
import {PATH_CHECK_OUT} from "../../ulti/appConst";
import {moneyFormat} from "../../ulti/helper";
import {toast} from "react-toastify";
import Router from 'next/router';

const CartModal = () => {
    const {t} = useTranslation("common");
    const {
        cartModal,
        setCartModal,
        locale,
        setCheckOutItems
    } = useAppContext();
    const [selectedTab, setSelectedTab] = useState("carts");
    const [selectedItems, setSelectedItems] = useState([]);

    const onHideModal = () => {
        setCartModal({
            ...cartModal,
            isVisible: false,
        });
        setSelectedItems([]);
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
        let newList = [...selectedItems];
        const idx = newList.findIndex(item => item.key === key);
        if (idx > -1) {
            newList[idx] = product;
        } else {
            if (addIfNotExisted) {
                newList.push(product);
            }
        }
        setSelectedItems(newList);
    };

    const removeSelectedItem = (key) => {
        let newList = [...selectedItems];
        setSelectedItems(newList.filter(item => {
            return item.key !== key;
        }))
    };

    const checkOut = async () => {
        if (selectedItems.length > 0 && getSubTotal() > 0) {
            setCheckOutItems(selectedItems);
            await Router.push(`/${PATH_CHECK_OUT}`);
            setCartModal({
                ...cartModal,
                isVisible: false,
                items: [],
            });
            setSelectedItems([])
        } else {
            toast(t("check_out_no_product"), {
                type: "error"
            });
        }
    };

    const TabCarts = () => {
        return <Tab eventKey="carts" className="cart-tab" title={<>{t("Cart")}</>}>
            <div className="px-4 py-2 pb-4">
                <small>Your have {cartModal.items.length} tours/ tickets in your cart</small>
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
                            <i>{t("No item in cart now")}</i>
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
                <div className="mt-3 d-flex justify-content-center booking-btn-list" style={{columnGap: "20px"}}>
                    <Button type="button"
                            variant="outline-primary"
                            className="px-md-3 py-md-2"
                            onClick={onHideModal}
                    >
                        <span className="d-none d-lg-block text-capitalize">{t("continue shopping")}</span>
                        <Icon icon={"eva:arrow-back-outline"} className="d-sm-block d-lg-none" height={24}/>
                    </Button>
                    <Button type="button"
                            disabled={selectedItems.length === 0}
                            onClick={() => checkOut()}
                            className="cart-btn px-md-5 py-md-2">
                        <span className="text-capitalize">{t("check out")}</span>
                    </Button>
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