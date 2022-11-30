'use strict';

module.exports = ({strapi}) => ({
  async getCities(ctx) {
    console.log("getCities Body", ctx.query);
    try {
      const res = await strapi
        .plugin('payment-vns')
        .service('paymentVnsService')
        .getCatalogs(ctx);
      console.log(res.data);
      const {city} = res.data;
      ctx.body = city;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  async getServices(ctx) {
    console.log("getServices Body", ctx.query);
    try {
      const {locale = "en", city_id} = ctx.query;
      const res = await strapi
        .plugin('payment-vns')
        .service('paymentVnsService')
        .getServices({locale, city_id});
      console.log(res.data);
      const {services} = res.data;
      ctx.body = services;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  async syncServices(ctx) {
    console.log("syncServices Body", ctx.request.body);
    try {
      const {locale = "en", city_id} = ctx.request.body;
      const res = await strapi
        .plugin('payment-vns')
        .service('paymentVnsService')
        .getServices({
          locale,
          city_id
        });
      console.log(res.data);
      const {services = []} = res.data;
      const res2 = await strapi
        .plugin('payment-vns')
        .service('paymentVnsService')
        .syncServices({
          data: services
        });
      console.log(res2);
      ctx.body = res.data;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  async getSettings(ctx) {
    try {
      ctx.body = await strapi
        .plugin('payment-vns')
        .service('paymentVnsService')
        .getSettings();
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  async setSettings(ctx) {
    try {
      const {body} = ctx.request;
      ctx.body = await strapi
        .plugin('payment-vns')
        .service('paymentVnsService')
        .setSettings(body);
    } catch (e) {
      ctx.throw(500, e);
    }
  },
});
