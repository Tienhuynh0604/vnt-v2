import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect} from "react";
import {callGet, featurePopulate, imagePopulate, initialProps} from "../ulti/helper";
import SliderBlock from "../components/home/SliderBlock";
import UniqueTour from "../components/home/UniqueTours";
import OurTours from "../components/home/OurTours";
import AboutUsBlock from "../components/home/AboutUsBlock";
import LatestNewBlock from "../components/home/LatestNewSection";
import TestimonialBlock from "../components/home/TestimonialBlock";

const Home = (props) => {
    const {homeData = {}, articlesData = [], tours = [], hotTours = []} = props;
    return (
        <>
            <SliderBlock dataSource={homeData.attributes.banners}/>
            <UniqueTour dataSource={homeData} tours={hotTours}/>
            <OurTours tours={tours}/>
            <AboutUsBlock dataSource={homeData.attributes.aboutUs}/>
            <LatestNewBlock dataSource={articlesData}/>
            <TestimonialBlock dataSource={homeData.attributes.review}/>
        </>
    )
};

export default Home;

export const getServerSideProps = async (context) => {
    const {locale} = context;
    let homeData = {};
    let articlesData = {};
    let hotTours = [];
    let tours = [];
    try {
        const p2 = callGet("/home-page", {
            populate: {
                banners: {
                    populate: {
                        image: imagePopulate(),
                        bgImage: imagePopulate()
                    }
                },
                hotFeature: featurePopulate(),
                aboutUs: featurePopulate(),
                review: {
                    populate: {
                        avatar: imagePopulate()
                    }
                }
            }
        }, locale, true);
        const p3 = callGet("/articles", {
            fields: ['title', 'slug', 'shortDescription', 'createdAt'],
            filters: {
                type: {
                    $ne: "System"
                }
            },
            sort: ['id:desc'],
            populate: {
                thumb: imagePopulate(),
            },
            pagination: {
                page: 1,
                pageSize: 6
            }
        }, locale, true);

        const p4 = callGet("/tours", {
            fields: [
                'title', 'slug', 'adultPrice', 'childPrice', 'isHot', 'discountLabel','hideBookingButton'
            ],
            filters: {
                isHot: true
            },
            populate: {
                tourCard: {
                    populate: {
                        image: imagePopulate(),
                        features: "*"
                    }
                },
                category: {
                    fields: ['name', 'slug']
                },
                tags: {
                    fields: ['name', 'className', 'slug']
                },
                destination: {
                    fields: ['name', 'slug']
                },
                review: featurePopulate(),
            },
            pagination: {
                page: 1,
                pageSize: 12
            },
            sort: ['id:desc']
        }, locale, true);

        const p5 = callGet("/tours", {
            fields: [
                'title', 'slug', 'adultPrice', 'childPrice', 'isHot', 'discountLabel','hideBookingButton'
            ],
            populate: {
                tourCard: {
                    populate: {
                        image: imagePopulate(),
                        features: "*"
                    }
                },
                category: {
                    fields: ['name', 'slug']
                },
                tags: {
                    fields: ['name', 'className', 'slug']
                },
                destination: {
                    fields: ['name', 'slug']
                }
            },
            pagination: {
                page: 1,
                pageSize: 12
            },
            sort: ['id:desc']
        }, locale, true);

        const [homeRes, articlesRes, hotToursRes, toursRes] = await Promise.all([p2, p3, p4, p5]);
        homeData = homeRes.data;
        articlesData = articlesRes.data;
        hotTours = hotToursRes.data;
        tours = toursRes.data;
    } catch (e) {
        console.error(e);
    }
    return {
        props: {
            homeData,
            articlesData,
            tours,
            hotTours,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};