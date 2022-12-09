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
    const {homeData = {}, articlesData = []} = props;
    return (
        <>
            <SliderBlock dataSource={homeData.attributes.banners}/>
            <UniqueTour dataSource={homeData}/>
            <OurTours/>
            <AboutUsBlock dataSource={homeData.attributes.aboutUs}/>
            <LatestNewBlock dataSource={articlesData}/>
            <TestimonialBlock/>
        </>
    )
};

export default Home;

export const getServerSideProps = async (context) => {
    console.log("Home.getServerSideProps");
    const {locale = "vi"} = context;
    let homeData = {};
    let articlesData = {};
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
            sort: ['id:desc'],
            populate: {
                thumb: imagePopulate(),
            },
            pagination: {
                page: 1,
                pageSize: 6
            }
        }, locale, true);
        const [homeRes, articlesRes] = await Promise.all([p2, p3]);
        homeData = homeRes.data;
        articlesData = articlesRes.data;
        console.log(articlesData);
    } catch (e) {
        console.error(e);
    }
    return {
        props: {
            homeData,
            articlesData,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};