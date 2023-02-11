import React, {memo, useEffect, useState} from "react";
import {useAppContext} from "../../layouts/AppLayout";
import {useTranslation} from "next-i18next";
import {nl2br} from "../../ulti/appUtil";
import {callGet, formatDate, imagePopulate} from "../../ulti/helper";
import {PATH_CITY_TOURS, PATH_NEWS} from "../../ulti/appConst";
import Link from "next/link";
import {strapiImg} from "../../ulti/strapiHelper";
import Skeleton from 'react-loading-skeleton';
import {toast} from "react-toastify";

const RecentTours = () => {

    const [tours, setTours] = useState([]);
    const [loading, setLoadings] = useState(false);
    const {t} = useTranslation("common");
    const {locale} = useAppContext();

    useEffect(() => {
        getTourList().catch(e => console.error(e));
    }, []);

    const getTourList = async () => {
        try {
            //Get Tour List
            setLoadings(true);
            const res = await callGet("/tours", {
                fields: [
                    'title', 'slug', 'isHot', 'discountLabel', 'createdAt'
                ],
                populate: {
                    tourCard: {
                        populate: {
                            image: imagePopulate(),
                        }
                    },
                    destination: {
                        fields: ['name', 'slug']
                    }
                },
                pagination: {
                    page: 1,
                    pageSize: 5
                }
            }, locale);
            console.log(res.data);
            setTours(res.data);
        } catch (e) {
            toast(e.message, {
                type: "error"
            });
        } finally {
            setLoadings(false);
        }
    };

    const LatestPosts = () => {
        return tours?.map((item, idx) => {
            return <div key={`lns_${idx}`} className="latest-news-item">
                <div className={"thumb"}>
                    <Link href={`/${PATH_CITY_TOURS}/${item.attributes.destination?.data?.attributes?.slug}/${item.attributes.slug}`}>
                        {strapiImg(item.attributes.tourCard?.image.data,
                            'w-100 h-100 hvr-grow-rotate'
                            , true
                            , false
                            , 'thumbnail')}
                    </Link>
                </div>
                <div className="info">
                    <div className="detail">
                        <Link href={`/${PATH_CITY_TOURS}/${item.attributes.destination?.data?.attributes?.slug}/${item.attributes.slug}`}>
                            <h3 className="text-black">{item.attributes.title}</h3>
                        </Link>
                    </div>
                </div>
            </div>
        })
    };

    return loading ? <p><Skeleton count={3}/></p> : <LatestPosts/>
};

export default memo(RecentTours);