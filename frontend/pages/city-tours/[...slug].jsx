import React from "react";
import {callGet, featurePopulate, getImageUrl, imagePopulate, initialProps, moneyFormat} from "../../ulti/helper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Button, Col, Container, Row} from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import Link from "next/link";
import {Icon} from "@iconify/react";
import {useTranslation} from "next-i18next";
import ImageSlider from "../../components/city-tours/ImageSlider";
import TourFeatures from "../../components/city-tours/TourFeatures";
import TourFeatureDetail from "../../components/city-tours/TourFeatureDetail";
import LightGallery from "lightgallery/react";
import DecorComponent from "../../components/DecorComponent";
import {useAppContext} from "../../layouts/AppLayout";
import Error from "../_error";
import {getMinPriceMaxPrice, renderDynamicFeature, renderImage} from "../../ulti/appUtil";
import slugify from "slugify";
import MainStopSlider from "../../components/city-tours/MainStopSlider";

const Page = ({model, paymentProduct}) => {
    const {t} = useTranslation("common");
    const {setBookingModal} = useAppContext();
    const {common = {}, locale} = useAppContext();

    if (!model) {
        return <Error statusCode={404}/>
    }

    const renderPrices = () => {
        const ret = [];
        if (!paymentProduct || !paymentProduct.attributes.priceList) {
            ret.push(<li className="breadcrumb-item">
                <Link href={common?.email?.link ? `mailto: ${common?.email?.link}`
                    : "#"}>
                    <i>{t("Liên hệ với chúng tôi")}</i>
                </Link>
            </li>);
        }


        try {
            const [minChildPrice, minAdultPrice] = getMinPriceMaxPrice(
                paymentProduct.attributes?.type,
                paymentProduct.attributes?.priceList,
                locale
            );
            ret.push(<li className="breadcrumb-item">
                {t("Adults")}: <strong>{moneyFormat(minAdultPrice, locale)}</strong>
            </li>);
            ret.push(<li className="breadcrumb-item">
                {t("Child")}: <strong>{moneyFormat(minChildPrice, locale)}</strong>
            </li>);
        } catch (e) {
            console.error(e);
            ret.push(<li className="breadcrumb-item">
                <Link href={common?.email?.link ? `mailto: ${common?.email?.link}`
                    : "#"}>
                    <i>{t("Liên hệ với chúng tôi")}</i>
                </Link>
            </li>);
        }

        return <ol className="breadcrumb">
            {ret.map(item => item)}
        </ol>
    };

    const renderBookingButton = (hideBookingButton) => {
        if (!hideBookingButton) {
            return <Button type="button"
                           onClick={() => setBookingModal({
                               isVisible: true,
                               productId: model.id,
                               item: {
                                   id: model.id
                               }
                           })}
                           className="btn btn-primary btn-book">
                {t('Book now')}
            </Button>
        } else {
            return <Button type={"button"}
                           onClick={() => {
                               setBookingModal({
                                   isVisible: true,
                                   bookingType: "contact",
                                   productName: model.attributes.title
                               });
                           }}
                           className="btn btn-primary btn-book">
                {t("Contact us")}
            </Button>
        }
    };

    return <PageLayout
        title={model.attributes.title}
        breadcrumbs={[
            {
                title: model.attributes?.destination?.data.attributes.name,
                link: `/city-tours/${model.attributes?.destination?.data.attributes.slug}`
            }
        ]}
        coverImage={getImageUrl(model?.attributes?.cover.data.attributes.url)}
    >
        <Container className="tour-detail">
            <div className="control d-flex justify-content-sm-start justify-content-md-between mb-3">
                <div>
                    <div>
                        <h1>{model.attributes.title}</h1>
                        {model.attributes.brochure?.data &&
                        <Link href={getImageUrl(model.attributes.brochure?.data.attributes.url)}
                              target="_blank"
                              className="ms-3">
                            <Icon icon={"ant-design:download-outlined"}/> Brochure
                        </Link>}
                    </div>
                    <nav className="price-list" aria-label="breadcrumb">
                        {renderPrices()}
                    </nav>
                </div>
                {renderBookingButton(model.attributes.hideBookingButton)}
            </div>
            <ImageSlider images={model.attributes.images.data}/>
            <div className='mt-3'>
                <TourFeatures id={"tour-feature"} features={model.attributes?.features}/>
            </div>
            <hr className="bold"/>
            {model.attributes.tourCustom?.map((item, idx) => {
                return (
                    <TourFeatureDetail key={`tfd_${idx}`}
                                       id={slugify(item.title)}
                                       name={item.title}>
                        {renderDynamicFeature(item)}
                    </TourFeatureDetail>
                )
            })}
            <TourFeatureDetail name={"BEFORE YOU GO"}>
                {model.attributes.scheduleImage?.data && (<>
                        <p>{t("byg.text1")}</p>
                        <b>{t("byg.text2")}</b>
                        <div className="position-relative py-3">

                            <LightGallery speed={500}>
                                <Link href={getImageUrl(model.attributes.scheduleImage?.data?.attributes.url)}>
                                    {renderImage(model.attributes.scheduleImage, {
                                        className: "w-100 h-auto"
                                    })}
                                </Link>
                            </LightGallery>
                        </div>
                    </>
                )}
                <ul>
                    {model.attributes.byg?.split("\n").map((item, idx) => (
                        <li key={`byg.li${idx}`}>{item}</li>
                    ))}
                </ul>
            </TourFeatureDetail>
            <TourFeatureDetail name={"MAP"}>
                <div className="position-relative py-3">
                    {model.attributes.mapImage?.data && (
                        <LightGallery speed={500}>
                            <Link href={getImageUrl(model.attributes.mapImage?.data?.attributes.url)}>
                                {renderImage(model.attributes.mapImage, {
                                    className: "w-100 h-auto"
                                })}
                            </Link>
                        </LightGallery>
                    )}
                </div>
                <Button className="text-uppercase">{t("live tracking")}</Button>
            </TourFeatureDetail>
            <TourFeatureDetail name={"main stops"}>
                <MainStopSlider tourId={model.id}/>
            </TourFeatureDetail>
        </Container>
        <DecorComponent/>
    </PageLayout>;
};

export const getServerSideProps = async (context) => {
    const {locale, query, req} = context;
    const {slug} = query;
    const [param1, param2] = slug;
    console.log("City tours detail:", param2);
    // const {}
    let model = null;
    let paymentProduct = null;
    try {
        const res = await callGet("/tours", {
            filters: {
                slug: param2
            },
            populate: {
                category: {
                    fields: ['name', 'slug']
                },
                tags: {
                    fields: ['name', 'className', 'slug']
                },
                destination: {
                    fields: ['name', 'slug']
                },
                brochure: "*",
                cover: imagePopulate(),
                images: imagePopulate(),
                scheduleImage: imagePopulate(),
                mapImage: imagePopulate(),
                features: featurePopulate(),
                tourCustom: {
                    populate: "*"
                },
                places: {
                    populate: {
                        thumb: imagePopulate()
                    }
                },
            },
            pagination: {
                page: 1,
                pageSize: 1
            },
        }, locale, true);

        if (res.data.length > 0) {
            model = res.data[0];
            console.log(model);
            const res2 = await callGet(`/tours/payment-product/${model.id}`);
            paymentProduct = res2.data;
        }

    } catch (e) {
        console.error(e.message);
    }

    return {
        props: {
            model,
            paymentProduct,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};

export default Page;