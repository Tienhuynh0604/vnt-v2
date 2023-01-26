import React from "react";
import {Button, Container, Table, Form} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import InputNumberPlusMinus from "../../components/booking/InputNumberPlusMinus";
import {Icon} from "@iconify/react";
import DecorComponent from "../../components/DecorComponent";

const Page = () => {
    const {carts = [], setCarts} = useAppContext();
    const {t} = useTranslation("common");


    return <PageLayout>
        <Container className="cart-section">
            <div>
                <h1><span>Your Cart</span></h1> <small>Your have 3 tours/ tickets in your cart</small>
            </div>
            <Table className="mt-4 booking-table" responsive>
                <thead>
                <tr>
                    <th>{t("product")}</th>
                    <th>{t("ticket")}</th>
                    <th>{t("price")}</th>
                    <th>{t("quantity")}</th>
                    <th className="text-end">{t("total")}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div className="d-flex justify-content-start align-items-center">
                            <Form>
                                <Form.Check
                                    className="ms-2"
                                    inline
                                    name="sp1"
                                    type={"checkbox"}
                                />
                            </Form>
                            <div className="image-thumb">
                                <Image src={'/images/products/sp1.jpg'}
                                       alt={"sss"}
                                       objectFit={"cover"}
                                       fill
                                />
                            </div>
                            <div className="ms-3">
                                <Link href={"/city-tours/ha-noi/ha-noi-double-decker-bus"}>
                                    <h6><strong>Ha Noi Double – Decker Bus</strong></h6>
                                    <small>4 hours</small>
                                </Link>
                            </div>
                        </div>
                    </td>
                    <td className="">
                        <div className="center-cell">
                            <div>
                                Adult (13+)
                            </div>
                            <div>
                                Child (4-12)
                            </div>
                        </div>
                    </td>
                    <td className="">
                        <div className="center-cell">
                            <div>
                                $23.00
                            </div>
                            <div>
                                $15.00
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="center-cell">
                            <div>
                                <InputNumberPlusMinus value={1}/>
                            </div>
                            <div>
                                <InputNumberPlusMinus value={1}/>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="center-cell align-items-end">
                            <span className="text-primary">
                                $23.00
                            </span>
                            <span className="text-primary">
                                $23.00
                            </span>
                        </div>
                    </td>
                    <td>
                        <div className="center-cell">
                            <Button variant="link">
                                <Icon className="text-danger" icon={"ep:close-bold"} height={16}/>
                            </Button>
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
                <Link href="/">
                    <Button type="button" variant="outline-primary" className="px-md-3 py-md-2">
                        <span className="text-capitalize">{t("continue shopping")}</span>
                    </Button>
                </Link>
                <Link href="/check-out">
                    <Button type="button" className="cart-btn px-md-5 py-md-2">
                        <span className="d-none d-lg-block text-capitalize">{t("check out")}</span>
                        <Icon icon={"bi:cart-plus-fill"} className="d-sm-block d-lg-none" height={24}/>
                    </Button>
                </Link>
            </div>
        </Container>
        <DecorComponent/>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = 'vi'} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};


export default Page;