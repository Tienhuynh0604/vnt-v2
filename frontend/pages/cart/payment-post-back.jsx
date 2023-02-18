import {useTranslation} from "react-i18next";
import PageLayout from "../../layouts/PageLayout";
import {Row, Col, Container, Button} from "react-bootstrap";
import DecorComponent from "../../components/DecorComponent";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Skeleton from 'react-loading-skeleton';
import {toast} from "react-toastify";
import Error from "../_error";
import QRCode from "react-qr-code";
import {Icon} from "@iconify/react";
import html2canvas from "html2canvas";
import downloadjs from 'downloadjs';
import {callGet} from "../../ulti/helper";

const Page = () => {
    const {t} = useTranslation("common");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const {token} = router.query;
    const [data, setData] = useState(null);

    useEffect(() => {
        if (token) {
            loadTicket();
        }
    }, [token]);

    const loadTicket = async () => {
        try {
            setIsLoading(true);
            const res = await callGet(`/orders/get-payment/${token}`);
            setData(res.data.data);
        } catch (e) {
            toast(e.message, {
                type: "error"
            })
        } finally {
            setIsLoading(false);
        }
    };

    const printDocument = async () => {
        try {
            const input = document.getElementById("ticket-list");
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL('image/jpeg');
            downloadjs(imgData, 'vn-sightseeing.jpg', 'image/jpeg');
        } catch (e) {
            console.log(e);
        }

    };

    const TicketItem = ({item}) => {
        return <div className="item">
            <div className="item-right">
                <div className="item-qr">
                    <QRCode value={item.ticket_id}
                            size={256}
                            style={{height: "auto", maxWidth: "100%", width: "100%"}}
                            viewBox={`0 0 256 256`}
                    />
                </div>
                {/*<span className="up-border"></span>*/}
                {/*<span className="down-border"></span>*/}
            </div>
            <div className="item-left">
                <div className="event">{t("company")}</div>
                <h2 className="title">{item.ticket_name}</h2>
                <div className="icon">
                    <Icon icon={"bi:people"}/> {data.customer_name}
                </div>
                <div className="icon">
                    <Icon icon={"mdi:map-marker-check-outline"}/> <span
                    className="me-2">{t("route")}:</span>{item.router_name}
                </div>
            </div>
        </div>
    };

    const TicketList = () => {
        if (!data) {
            return <Error statusCode={404}/>
        }
        return <div className='ticket-container'>
            <Row id={'ticket-list'}>
                {data.list?.map((item, idx) => {
                    return <Col xs={12} md={6} key={`t_${idx}`}>
                        <TicketItem item={item}/>
                    </Col>
                })}
            </Row>
            <div className="d-flex justify-content-center mt-4">
                <Button disabled={isLoading} onClick={async () => await printDocument()}>{t("save.pdf")}</Button>
            </div>
        </div>
    };

    return <PageLayout title={t("ticket")}>
        <Container className="ticket-section">
            <h1>{t("ticket.t1")}</h1>
            <p>
                {t("ticket.t2")}
            </p>
            {isLoading ? <p><Skeleton count={5}/></p> : <TicketList/>}
        </Container>
        <DecorComponent/>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = 'en'} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};


export default Page;