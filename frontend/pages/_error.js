import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Container, Button} from "react-bootstrap";
import React from "react";
import Link from "next/link";

const Error = ({statusCode}) => {
    return (
        <Container>
            <div className="d-flex align-items-center flex-column py-5" >
                <h1> {statusCode ? statusCode : '404'} </h1>
                <div className="mb-5">Có lỗi xảy ra, xin vui lòng quay về trang chủ để bắt đầu lại</div>
                <Link href={'/'}>
                    <Button color={"primary"}>Quay lại</Button>
                </Link>
            </div>
        </Container>
    )
};

export default Error

export const getStaticProps = async (context) => {
    const {locale = "vi", res, err} = context;
    console.log("err", err);
    try {
        // const initProps = await initialProps(context);
        const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
        return {
            props: {
                statusCode,
                // ...initProps,
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