import React, {useCallback, useEffect, useRef, useState} from "react";
import {Container, Form} from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import LightGallery from 'lightgallery/react';
import Image from "next/image";
import DecorComponent from "../../components/DecorComponent";
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import {callGet, getImageUrl, imagePopulate} from "../../ulti/helper";
import {nl2br} from "../../ulti/appUtil";
import {useAppContext} from "../../layouts/AppLayout";
import AppPagination from "../../components/AppPagination";
import Router from 'next/router';

const Page = ({galleries = {}, destinations = [], query = {}}) => {
    const {t} = useTranslation("common");
    const [images, setImages] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageCount: 0
    });
    const {locale} = useAppContext();

    const lightGallery = useRef(null);
    const onInit = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

    useEffect(() => {
        if (galleries) {
            setImages(galleries.data);
        }
    }, [galleries]);

    useEffect(() => {
        lightGallery.current.refresh();
    }, [images]);

    const handleChange = async (value) => {
        let query = {
            page: 1,
        };

        if (value && value !== 'all') {
            query.destination = value;
        }

        await Router.push({
            pathname: '/galleries',
            query
        })
    };

    return <PageLayout title={t("galleries")}
                       breadcrumbs={[
                           {
                               title: t("galleries"),
                               link: "/galleries"
                           }
                       ]}
    >
        <Container className="gallery-section">
            <div className="d-flex justify-content-between">
                <h1><span className="text-capitalize">{t("our galleries")}</span></h1>
                <Form.Select size={"sm"} className="text-capitalize" onChange={e => handleChange(e.target.value)}>
                    <option value="all">{t("all")}</option>
                    {destinations.map((item, idx) => {
                        return <option key={`d_opt${idx}`} value={item.attributes.slug}>
                            {item.attributes.name}
                        </option>
                    })}
                </Form.Select>
            </div>
            <div className="mt-4">
                <LightGallery
                    speed={500}
                    onInit={onInit}
                    elementClassNames="galleries"
                    plugins={[lgThumbnail, lgZoom]}
                >
                    {images.map((item, idx) => {
                        const img = item.attributes.image.data;
                        const smallImg = img.attributes?.formats?.small ?
                            img.attributes.formats.small : img.attributes
                        ;
                        const isPortrait = smallImg.width < smallImg.height;
                        const isUltraWide = smallImg.width / smallImg.height >= 21 / 9;
                        let caption = item.attributes.caption;
                        if (item.attributes.description) {
                            caption = `${caption}<br/>${nl2br(item.attributes.description)}`;
                        }

                        return <div key={`lg-${idx}`}
                                    data-lg-size={`${img.attributes.width}-${img.attributes.height}`}
                                    data-src={getImageUrl(img.attributes.url)}
                                    data-sub-html={caption}
                                    className={`gallery-item ${isPortrait ? "portrait" : ""} ${isUltraWide ? "ultra-wide" : ""}`}>
                            <Image src={getImageUrl(smallImg.url)}
                                // width={smallImg.width}
                                // height={smallImg.height}
                                   fill
                                   objectFit={"cover"}
                                   alt={item.attributes.alternativeText ? item.attributes.alternativeText : item.attributes.name}/>
                        </div>
                    })}
                </LightGallery>
                <div className='d-flex justify-content-end mt-3'>
                    <AppPagination {...galleries.meta.pagination} query={query} baseUrl={"/galleries"}/>
                </div>
            </div>
        </Container>
        <DecorComponent/>
    </PageLayout>
};

const getGalleries = async (locale, filters = {}, pagination = {
    page: 1,
    pageSize: 20
}) => {
    try {
        return await callGet("/galleries", {
            filters,
            sortBy: ['id:desc'],
            populate: {
                image: imagePopulate()
            },
            pagination
        }, locale, true);
    } catch (e) {
        return {
            data: [],
            meta: {
                pagination: {
                    page: 1,
                    pageSize: 20,
                    pageCount: 1,
                    total: 4
                }
            }
        }
    }
};

export const getServerSideProps = async (context) => {
    const {locale = 'vi', query = {}} = context;

    let galleries = {};
    let destinations = [];
    try {
        const resDestinations = await callGet("/destinations", {
            sortBy: ['name:asc'],
            fields: ['name', 'slug'],
            filters: {
                locale
            }
        });

        let filters = {};
        if (query.destination) {
            filters.destination = {
                slug: query.destination
            };
        }

        galleries = await getGalleries(locale,
            filters,
            {
                page: query.page ? query.page : 1,
                pageSize: query.pageSize ? query.pageSize : 20
            });
        destinations = resDestinations.data;
    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            galleries,
            destinations,
            query,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};


export default Page;