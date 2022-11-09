import React from "react";
import {Container} from "react-bootstrap";
import {callGet, featurePopulate, imagePopulate, initialProps} from "../../ulti/helper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import PageLayout from "../../layouts/PageLayout";
import DecorComponent from "../../components/DecorComponent";
import TicketBus from "../../components/city-tours/TicketBus";

const Index = (props) => {
    return <PageLayout>
        <Container>
            <div className="text-center">
                <h1 className="text-center">Hà Nội Traveling</h1>
            </div>
            <hr/>
            <p className="">
                Thang Long – Hanoi City Tour with a route of about 90 minutes will take visitors across scenic places,
                works, historical relics, cultural and religious major of Hanoi such as Ly Thai To Flower Garden,
                Sofitel Metropole Hotel, Hanoi Center Post Office, Vietnam Military History Museum, Thang Long Imperial
                Citadel, Quan Thanh Temple, Tran Quoc Pagoda, Ho Chi Minh Complex, Temple of Literature, Hoa Lo Prison,
                Hanoi Cathedral, Hanoi Old Quarter, Women Museum, Hoan Kiem Lake or Opera House.
            </p>
            <TicketBus/>
        </Container>
        <DecorComponent/>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = "vi"} = context;
    let initProps = {};
    try {
        initProps = await initialProps(context);

    } catch (e) {
        initProps = {};
    }
    return {
        props: {
            ...initProps,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};

export default Index;