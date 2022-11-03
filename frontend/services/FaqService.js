import {callGet, callPost} from "../ulti/helper";

export const createFaq = async (formData, locale = 'vi') => {
    try {
        return await callPost(`/faqs/client-submit`, formData, locale);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getFaqModels = async (page = 1, locale = 'vi') => {
    try {
        const modelQuery = {
            fields: ['name', 'title', 'question', 'slug', 'createdAt'],
            sort: ['id:desc'],
            pagination: {
                page: page,
                pageSize: 12
            }
        };
        return await callGet(`/faqs`, modelQuery, locale);
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

export const getSingleFaq = async (slug, locale = 'vi') => {
    let model = null;
    try {
        const modelQuery = {
            fields: ['name', 'title', 'question', 'content', 'createdAt'],
            filters: {
                slug: {
                    "$eq": slug
                }
            },
            pagination: {
                pageSize: 1
            }
        };
        const res = await callGet(`/faqs`, modelQuery, locale);
        if (res.data.length > 0 && res.data[0].attributes) {
            model = res.data[0];
        }
    } catch (e) {
        console.log(e);
    }

    return model;
};