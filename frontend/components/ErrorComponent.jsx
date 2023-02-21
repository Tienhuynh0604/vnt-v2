import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ErrorComponent = () => {
    const { t } = useTranslation("common");
    return (
        <div className="d-flex align-items-center flex-column py-5 bg-primary h-100">
            <Image src="/404.png"
                width={701}
                height={446}
                style={{
                    maxWidth: "100%",
                    margin: "auto"
                }}
            />
            <Link href={'/'}>
                <Button variant={"light"} className="mt-5">{t("Home")}</Button>
            </Link>
        </div>
    )
};

export default ErrorComponent;