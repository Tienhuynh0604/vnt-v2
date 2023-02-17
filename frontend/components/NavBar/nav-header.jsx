import React from "react";
import { useTranslation } from "next-i18next";
import Image from 'next/image';
import Link from "next/link";
import { NavDropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useAppContext } from "../../layouts/AppLayout";
import { renderContactItem } from "../../ulti/appUtil";

const NavHeader = () => {

    const { t } = useTranslation("common");
    const { common, locale } = useAppContext();

    return <div className="header-1">
        <div className="container d-none d-md-block">
            <div className="row nav-header p-2">
                <div className="col-lg-6 col-12 nav-l d-flex justify-content-center justify-content-lg-start">
                    <ul className="list-inline">
                        {common.email &&
                            <li key="hi-e" className="list-inline-item">
                                {renderContactItem(common.email)}
                            </li>
                        }
                        {common.phone &&
                            <li key="hi-p" className="list-inline-item">
                                {renderContactItem(common.phone)}
                            </li>
                        }
                    </ul>
                </div>
                <div className="col-lg-6 col-12 nav-r d-flex justify-content-lg-end justify-content-center align-items-center">
                    <NavDropdown title={t(locale)} className="d-inline-block me-3 text-capitalize">
                        <NavDropdown.Item href="/en">
                            <Image alt={"English"} src="/images/en.jpg" width={27} height={21} /> EN
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/vi">
                            <Image alt={"Tiếng Việt"} src="/images/vi.jpg" width={27} height={21} /> VI
                        </NavDropdown.Item>
                    </NavDropdown>
                    <ul className="list-inline d-inline-block">
                        {common.socials && common.socials.map((item, idx) => (
                            <li key={`rhi${idx}`} className="list-inline-item">
                                {renderContactItem(item, 'header_s_i', false)}
                            </li>
                        ))}
                        <li key="rhi-bc" className="list-inline-item">
                            <Link href={"/"}>
                                <Icon icon="ion:bus-outline" /> <span>{t("Ticket check")}</span>
                            </Link>
                        </li>
                        <li key="rhi-cart" className="list-inline-item">
                            <Link href={"/"}>
                                <Icon icon="ion:cart" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr className="m-0" />
    </div>;
};

export default NavHeader;