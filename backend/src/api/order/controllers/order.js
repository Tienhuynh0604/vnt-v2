'use strict';

/**
 * order controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi}) => ({
  async createOrder(ctx) {
    try {
      console.log("createOrder Body", ctx.request.body);

      const {customer, products} = ctx.request.body;

      const resData = {
        "code": 0,
        "message": "Thành công",
        "data": "https://pay.vnpay.vn/vpcpay.html?vnp_Amount=165000000&vnp_Command=pay&vnp_CreateDate=20230217232417&vnp_CurrCode=VND&vnp_IpAddr=113.190.215.225&vnp_Locale=vn&vnp_OrderInfo=Dat%20ve%20xe%2C%20ST%3A%201%2C650%2C000VND&vnp_OrderType=250000&vnp_ReturnUrl=https%3A%2F%2Fpayment.vn-sightseeing.com%2Fapi%2Fvnpay_payment%2Fvnpay_return&vnp_TmnCode=NGAMCANH&vnp_TxnRef=230217000002&vnp_Version=2&vnp_SecureHashType=MD5&vnp_SecureHash=c3623e0ad1665e798eeef327241a7aa4"
      };

      const retParams = new URLSearchParams(resData.data.split("?")[1]);
      const getToken = retParams.get("vnp_SecureHash");

      ctx.body = {
        data: ctx.request.body
      }
    } catch (e) {
      if (e.response.data) {
        ctx.throw(500, e.response.data);
      } else {
        ctx.throw(500, e);
      }
    }
  },
  async getOrder(ctx) {
    try {
      const {token} = ctx.params;
      const res = await strapi.plugin('payment-vns')
        .service('paymentVnsService')
        .getOrder(token, "en");
      ctx.body = {
        data: res.data
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  },
}));
