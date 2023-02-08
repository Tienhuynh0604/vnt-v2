import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {callGet, getImageUrl, imagePopulate, seoPopulate} from "../../ulti/helper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import PageLayout from "../../layouts/PageLayout";
import DecorComponent from "../../components/DecorComponent";
import TicketBus from "../../components/city-tours/TicketBus";
import {useTranslation} from "next-i18next";
import PopularDestination from "../../components/city-tours/PopularDestination";
import {Icon} from "@iconify/react";
import Link from "next/link";
import Error from "../_error";
import {PATH_NEWS} from "../../ulti/appConst";
import {useAppContext} from "../../layouts/AppLayout";

const Index = (props) => {
    const {locale} = useAppContext();
    const {t} = useTranslation("common");
    const {model, articles = []} = props;

    if (!model) {
        return <Error statusCode={404}/>
    }

    return <PageLayout title={locale === "en" ? model.attributes.name_en : model.attributes.name}
                       coverImage={getImageUrl(model?.attributes?.thumb.data.attributes.url)}
    >
        <div className="position-relative">
            <Container>
                <div className="text-center">
                    <h1 className="">{locale === "en" ? model.attributes.name_en : model.attributes.name} Traveling</h1>
                </div>
                <hr/>
                <div className="" dangerouslySetInnerHTML={{
                    __html: model.attributes.content
                }}/>
                <TicketBus destination={model}/>
            </Container>
            <DecorComponent/>
        </div>
        <div className="bg-grey py-5">
            <Container>
                <PopularDestination places={model?.attributes?.places}/>
            </Container>
        </div>
        <div className="py-5">
            <Container>
                <h1 className="text-capitalize">{t("post about")} {model?.attributes?.name}</h1>
                <Row>
                    {articles.map((item, idx) => (
                        <Col xs={12} md={4}>
                            <Icon icon={"ci:dot-02-s"}
                                  className="text-warning"
                                  height={16}/>
                            <Link href={`/${PATH_NEWS}/${item.attributes.slug}`}>
                                {item.attributes.title}
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale, query, req} = context;
    const {slug} = query;
    console.log(`City tours: `, slug, locale);
    let model = null;
    let articles = [];
    let tours = [];
    try {
        const res = await callGet("/destinations", {
            filters: {
                slug
            },
            populate: {
                thumb: imagePopulate(),
                places: {
                    populate: {
                        image: imagePopulate(),
                    }
                },
                seo: seoPopulate(),
            },
            pagination: {
                pageSize: 1
            }
        }, locale, true);

        model = res.data[0];

        const res2 = await callGet("/articles", {
            fields: ['title', 'slug'],
            filters: {
                destination: {
                    slug,
                },
            },
            sort: ["id:desc"],
            pagination: {
                page: 1,
                pageSize: 9
            }
        });
        articles = res2.data;
    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            model,
            articles,
            tours,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};

export default Index;