import React, {memo, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import ProductCard from "../ProductCard";
import {callGet, imagePopulate, seoPopulate} from "../../ulti/helper";
import {strapPaginationWithOnChangePage} from "../../ulti/strapiHelper";
import {toast} from "react-toastify";
import {useAppContext} from "../../layouts/AppLayout";
import Skeleton from 'react-loading-skeleton';

const TicketBus = ({destination, query = {}}) => {
    const {locale} = useAppContext();
    const [tabs, setTabs] = useState([]);
    const [loadingTour, setLoadingTour] = useState(false);
    const [tours, setTours] = useState({
        data: [],
        meta: {
            pagination: {
                page: 1,
                pageCount: 1,
            }
        }
    });
    const [currentSelect, setCurrentSelect] = useState(null);

    useEffect(() => {
        getTourInformation().catch(e => console.error(e));
    }, [destination]);

    const onChangeTab = (tab) => {
        if (tab !== currentSelect) {
            setCurrentSelect(tab);
            getTourList(tab);
        }
    };

    const onChangePage = (page) => {
        getTourInformation(page);
    };

    const getTourInformation = async () => {
        try {
            const res = await callGet("/categories", {
                fields: ["name", "slug"],
                filters: {
                    parentCategory: {
                        slug: "tour"
                    }
                },

            }, null, true);
            setTabs(res.data);
            let selected = null;
            if (res.data.length > 0) {
                selected = res.data[0].id;
                setCurrentSelect(selected);
            }

            await getTourList(selected, 1);
        } catch (e) {
            console.error(e);
        }
    };

    const getTourList = async (categoryId, page = 1) => {
        try {
            //Get Tour List
            setLoadingTour(true);
            const res = await callGet("/tours", {
                fields: [
                    'title', 'slug', 'adultPrice', 'childPrice', 'isHot', 'discountLabel', 'hideBookingButton'
                ],
                filters: {
                    destination: {
                        id: destination.id
                    },
                    category: {
                        id: categoryId,
                    }
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
                    }
                },
                sort: ['id:desc'],
                pagination: {
                    page
                }
            }, locale);
            console.log(res.data);
            setTours(res);
        } catch (e) {
            toast(e.message, {
                type: "error"
            });
        } finally {
            setLoadingTour(false);
        }
    };

    return <div className="ticket-bus-block my-5">
        <ol className="breadcrumb">
            {tabs.map((item, idx) => {
                return (
                    <li className={`breadcrumb-item ${currentSelect === item.id && "active"}`}
                        key={`tb_${idx}`}
                        aria-current="page">
                        <a onClick={() => onChangeTab(item.id)}><span>{item.attributes.name}</span></a>
                    </li>
                )
            })}
        </ol>
        <Row>
            {loadingTour ? <p><Skeleton count={5}/></p> : tours.data.map((item, idx) => (
                <Col key={`p-c${idx}`} xs={12} md={6} lg={4} xxl={3}>
                    <ProductCard destination={destination} item={item} className="city-tour-item"/>
                </Col>
            ))}
            {strapPaginationWithOnChangePage(
                onChangePage,
                tours?.meta?.pagination)
            }
        </Row>
    </div>
};

export default memo(TicketBus);
