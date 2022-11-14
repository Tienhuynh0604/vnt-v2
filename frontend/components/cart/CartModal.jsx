import React, {memo, useState} from "react";
import {useTranslation} from "next-i18next";
import {Button, Container, Form, Modal, Tab, Table, Tabs} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import Image from "next/image";
import Link from "next/link";
import InputNumberPlusMinus from "../booking/InputNumberPlusMinus";
import {Icon} from "@iconify/react";

const CartModal = () => {
    const {t} = useTranslation("common");
    const {cartModal, setCartModal} = useAppContext();
    const [selectedTab, setSelectedTab] = useState("carts");

    const onHideModal = () => {
        setCartModal({
            ...cartModal,
            isVisible: false,
        })
    };

    const TabCarts = () => {
        return <Tab eventKey="carts" className="cart-tab" title={<>{t("Cart")}</>}>
            <div className="p-4">
                <small>Your have 3 tours/ tickets in your cart</small>
                <Table className="mt-4 booking-table" responsive>
                    <thead>
                    <tr>
                        <th>{t("product")}</th>
                        <th>{t("ticket")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <div className="d-flex justify-content-start align-items-center">
                                <Form>
                                    <Form.Check
                                        className="ms-1"
                                        inline
                                        name="sp1"
                                        type={"checkbox"}
                                    />
                                </Form>
                                <div className="image-thumb small">
                                    <Image src={'/images/products/sp1.jpg'}
                                           alt={"sss"}
                                           objectFit={"cover"}
                                           fill
                                    />
                                </div>
                            </div>
                        </td>
                        <td className="">
                            <div className="ms-1">
                                <div className="">
                                    <Link href={"/citi-tours/ha-noi/ha-noi-double-decker-bus"}>
                                        <h6 className="ellipsis-1 mb-0"><strong>Ha Noi Double – Decker Bus</strong></h6>
                                    </Link>
                                    <small>4 hours</small>
                                </div>
                                <div className="sub-variant mt-3 mb-2">
                                    <span>Adult (13+): <strong>$23.00</strong></span>
                                    <InputNumberPlusMinus value={1}/>
                                </div>
                                <div  className="sub-variant">
                                    <span>Child (4-12): <strong>$15.00</strong></span>
                                    <InputNumberPlusMinus value={1}/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <div className="d-flex justify-content-end">
                                <strong>Sub total:</strong>
                                <span className="sub-total ms-3 text-danger">$60.00</span>
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
                    <Link href="/check-out">
                        <Button type="button" className="cart-btn px-md-5 py-md-2">
                            <span className="text-capitalize">{t("check out")}</span>
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