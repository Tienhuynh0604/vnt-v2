import {callGet, imagePopulate, seoPopulate} from "../ulti/helper";

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
