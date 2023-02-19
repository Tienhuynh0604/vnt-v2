import {callPost} from "../ulti/helper";

export const createOrder = async (values, locale) => {
    try {
        return await callPost(`/orders/create-payment`, values, locale);
    } catch (e) {
        console.error(e);
        throw e;
    }
};