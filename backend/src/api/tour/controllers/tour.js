'use strict';

/**
 * tour controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tour.tour', ({strapi}) => ({
  async getPaymentProductAction(ctx) {
    const {id} = ctx.params;
    try {
      const entity = await strapi.service('api::tour.tour').getPaymentProduct(id);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (e) {
      throw e;
    }

  },
  async getPlacesAction(ctx) {
    const {id} = ctx.params;
    try {
      const entities = await strapi.service('api::tour.tour').getPlaces(id);
      ctx.body = {
        data: entities
      }
    } catch (e) {
      throw e;
    }
  },
}));
