import {callGet, imagePopulate, seoPopulate} from "../ulti/helper";

export const getAllArticleModelByCats = async (categorySlugs,
                                               page = 1,
                                               locale = 'en',
                                               sortOrder = ['sortOrder:asc', 'id:desc'],
                                               pageSize = 12) => {
    const modelQuery = {
        fields: ['title', 'slug', 'shortDescription'],
        filters: {
            categories: {
                slug: {
                    $in: categorySlugs
                },
            },
        },
        sort: sortOrder,
        populate: {
            thumbnail: imagePopulate(),
            categories: "*",
        },
        pagination: {
            page: page,
            pageSize
        }
    };
    return await callGetArticles(modelQuery, locale);
};

export const callGetArticles = async (modelQuery, locale) => {
    try {
        return await callGet(`/articles`, modelQuery, locale);
    } catch (e) {
        console.error(e);
        return {
            data: [],
            meta: {
                pagination: {
                    page: 1,
                    pageCount: 1,
                }
            }
        };
    }
};

export const getArticleModels = async (categorySlug, page = 1, locale = 'en') => {
    const modelQuery = {
        fields: ['title', 'slug', 'shortDescription'],
        filters: {
            categories: {
                slug: categorySlug
            },
        },
        sort: ['sortOrder:asc', 'id:desc'],
        populate: {
            thumbnail: imagePopulate(),
        },
        pagination: {
            page: page,
            pageSize: 12
        }
    };
    return await callGetArticles(modelQuery, locale);
};

export const getSingleArticle = async (slug, locale = 'en') => {
    let model = null;
    try {
        const modelQuery = {
            filters: {
                slug: {
                    "$eq": slug
                }
            },
            populate: {
                categories: "*",
                seo: seoPopulate(),
                thumbnail: imagePopulate(),
                cover: imagePopulate()
            },
            pagination: {
                pageSize: 1
            }
        };
        const res = await callGet(`/articles`, modelQuery, locale);
        if (res.data.length > 0 && res.data[0].attributes) {
            model = res.data[0].attributes;
        }
    } catch (e) {
        console.log(e);
    }

    return model;
};