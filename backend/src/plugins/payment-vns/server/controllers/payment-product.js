// server/controllers/task.js
'use strict';

/**
 *   controller
 */


module.exports = ({ strapi }) => ({
    async getPaymentProductAction(ctx) {
        const { id } = ctx.params;
        try {
            const entity = await strapi
                .plugin('payment-vns')
                .service('paymentProductService')
                .findOne(id);
            ctx.body = entity;
        } catch (e) {
            throw e;
        }

    },
});
