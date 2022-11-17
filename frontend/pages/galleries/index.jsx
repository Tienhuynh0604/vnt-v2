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

const Page = ({galleries = []}) => {
    const {t} = useTranslation("common");
    const [images, setImages] = useState([]);

    const lightGallery = useRef(null);
    const onInit = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

    useEffect(() => {
        if (galleries) {
            setImages(galleries);
        }
    }, [galleries]);

    useEffect(() => {
        lightGallery.current.refresh();
    }, [images]);


    return <PageLayout>
        <Container className="gallery-section">
            <div className="d-flex justify-content-between">
                <h1><span className="text-capitalize">{t("our galleries")}</span></h1>
                <Form.Select size={"sm"}>
                    <option>{t("all")}</option>
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
                        const smallImg = img.attributes.formats.small;
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
                                   alt={item.attributes.alternativeText}/>
                        </div>
                    })}
                </LightGallery>
            </div>
        </Container>
        <DecorComponent/>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = 'vi'} = context;

    let galleries = [];
    try {
        const res = await callGet("/galleries", {
            sortBy: ['id:desc'],
            populate: {
                image: imagePopulate()
            }
        });
        galleries = res.data;
    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            galleries,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};


export default Page;