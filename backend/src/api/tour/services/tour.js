'use strict';

/**
 * tour service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tour.tour', ({strapi}) => ({
  async getPaymentProduct(tourId) {
    let results1 = await strapi.db.connection.raw(
      `select * from tours_payment_product_links where tour_id = ${tourId} LIMIT 1`
    );
    const [rows] = results1;
    if (!rows[0]) {
      return null;
    }
    const relation = rows[0];
    return await strapi.entityService.findOne('plugin::payment-vns.payment-product'
      , relation.payment_product_id);
  }
}));
