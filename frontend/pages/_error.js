import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Container, Button} from "react-bootstrap";
import React from "react";
import Link from "next/link";
import EmptyLayout from "../layouts/EmptyLayouts";
import {useTranslation} from "next-i18next";

const Error = (props) => {
    const {t} = useTranslation("common");
    const {statusCode, message} = props;
    return (
        <Container>
            <div className="d-flex align-items-center flex-column py-5">
                <h1> {statusCode ? statusCode : '404'} </h1>
                <div className="mb-5">{message ? message : t("err.t1")}</div>
                <Link href={'/'}>
                    <Button color={"primary"}>{t("home")}</Button>
                </Link>
            </div>
        </Container>
    )
};

Error.getLayout = (page, props) => {
    return <EmptyLayout {...props}>
        {page}
    </EmptyLayout>
};

export default Error

export const getServerSideProps = async (context) => {
    const {locale = "en", res, err} = context;
    console.log("Error getServerSideProps", err);
    try {
        const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
        return {
            props: {
                statusCode,
                ...(await serverSideTranslations(locale, ['common'])),
            },
        }
    } catch (e) {
        return {
            props: {
                statusCode: 500,
                ...(await serverSideTranslations(locale, ['common'])),
            },
        }
    }

};