import {callPost, imagePopulate} from "../ulti/helper";

export const createContact = async (formData, locale = 'en') => {
    try {
        return await callPost(`/contacts`, {
            ...formData,
        }, locale);
    } catch (e) {
        console.error(e);
        throw e;
    }
};