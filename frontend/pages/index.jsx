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
    const {homeData = {}} = props;
    return (
        <>
            <SliderBlock dataSource={homeData.attributes.banners}/>
            <UniqueTour dataSource={homeData}/>
            <OurTours/>
            <AboutUsBlock dataSource={homeData.attributes.aboutUs}/>
            <LatestNewBlock/>
            <TestimonialBlock/>
        </>
    )
};

export default Home;

export const getServerSideProps = async (context) => {
    console.log("Home.getServerSideProps");
    const {locale = "vi"} = context;
    let homeData = {};
    let bannerData = {};
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
            populate: {
                thumbnail: imagePopulate(),
            },
            pagination: {
                page: 1,
                pageSize: 6
            }
        }, locale, true);
        const [homeRes, bannerRes] = await Promise.all([p2, p3]);
        homeData = homeRes.data;
        bannerData = bannerRes.data;
    } catch (e) {
        console.error(e);
    }
    return {
        props: {
            homeData,
            bannerData,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};