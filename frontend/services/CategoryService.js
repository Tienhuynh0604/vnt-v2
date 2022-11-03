import {callGet, imagePopulate} from "../ulti/helper";

export const getServiceCategories = async (mainCategorySlug, fields = ['name', 'slug', 'description']) => {
    try {
        const query = {
            fields: fields,
            filters: {
                parentCategoy: {
                    slug: mainCategorySlug
                }
            },
            populate: {
                thumb: imagePopulate(),
            },
            pagination: {
                pageSize: 100
            }
        };
        const res = await callGet(`/categories`, query);
        return res.data;
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const getSingleCategory = async (slug) => {
    let ret = null;
    try {
        const modelQuery = {
            fields: ['name', 'slug', 'description'],
            filters: {
                slug: slug
            },
            populate: {
                thumb: imagePopulate(),
            },
            pagination: {
                pageSize: 1
            }
        };
        const res = await callGet(`/categories`, modelQuery);

        if (res.data && res.data.length > 0) {
            ret = res.data[0];
        }
    } catch (e) {
        console.error(e);
    }
    return ret;
};