import React, {memo, useEffect, useState} from "react";
import {useAppContext} from "../../layouts/AppLayout";
import {useTranslation} from "next-i18next";
import {nl2br} from "../../ulti/appUtil";
import {callGet, formatDate, imagePopulate} from "../../ulti/helper";
import {PATH_NEWS} from "../../ulti/appConst";
import Link from "next/link";
import {strapiImg} from "../../ulti/strapiHelper";
import Skeleton from 'react-loading-skeleton';

const RecentPosts = ({exceptId = null}) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoadings] = useState(false);
    const {t} = useTranslation("common");
    const {locale} = useAppContext();

    useEffect(() => {
        getRecentPosts().catch(e => console.error(e));
    }, []);

    const getRecentPosts = async () => {
        try {
            setLoadings(true);
            const res = await callGet('/articles', {
                fields: ["title", 'slug', 'createdAt'],
                filters: {
                    id: {
                        $ne: exceptId
                    }
                },
                populate: {
                    thumb: imagePopulate(),
                },
                sort: ['id:desc'],
                pagination: {
                    page: 1,
                    pageSize: 5
                }
            }, locale, true);
            console.log(res);
            setArticles(res.data);
        } catch (e) {
        } finally {
            setLoadings(false);
        }

    };

    const LatestPosts = () => {
        return articles.map((item, idx) => {
            return <div key={`lns_${idx}`} className="latest-news-item">
                <div className={"thumb"}>
                    <Link href={`/${PATH_NEWS}/${item.attributes.slug}`}>
                        {strapiImg(item.attributes.thumb.data,
                            'w-100 h-100 hvr-grow-rotate', true)}
                    </Link>
                </div>
                <div className="info">
                    <div className="date">
                        {formatDate(item.attributes.createdAt)}
                    </div>
                    <div className="detail">
                        <Link href={`/${PATH_NEWS}/${item.attributes.slug}`}>
                            <h3 className="text-black">{item.attributes.title}</h3>
                        </Link>
                    </div>
                </div>
            </div>
        })
    };

    return loading ? <p><Skeleton count={3}/></p> : <LatestPosts/>
};

export default memo(RecentPosts);