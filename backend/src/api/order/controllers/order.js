'use strict';

/**
 * order controller
 */

const {createCoreController} = require('@strapi/strapi').factories;
const {ValidationError} = require('@strapi/utils').errors;
const recaptchaValidator = require('recaptcha-validator');

module.exports = createCoreController('api::order.order', ({strapi}) => ({
  async createOrder(ctx) {
    try {
      strapi.log.info("createOrder Body: %s", JSON.stringify(ctx.request.body));

      const {data} = ctx.request.body;
      if (!data) {
        ctx.throw(400, "Body data is empty");
        return;
      }
      const {fullname, phone, email, countryCode, paymentType, order, recaptcha} = data;

      //Verify data
      if (!fullname || !phone || !email || !countryCode || !paymentType || !order) {
        ctx.throw(400, "Missing params");
        return;
      }

      if (!Array.isArray(order) || order.length <= 0) {
        ctx.throw(400, "Order wrong format or empty");
        return;
      }

      const customerData = {
        fullname,
        phone,
        email,
        country: countryCode
      };

      const customerModel = strapi.contentTypes[("api::customer.customer")];
      await strapi.entityValidator.validateEntityCreation(customerModel, customerData, {});
      // if (process.env.RECATPCHA_ENABLE === "true" && process.env.RECATPCHA_SERVER) {
      //   try {
      //     await recaptchaValidator(process.env.RECATPCHA_SERVER, recaptcha);
      //   } catch (e) {
      //     throw new ValidationError(e);
      //   }
      // }

      //Validate products
      const tourIds = [];
      const paymentVnss = [];
      const finalOrder = [];
      let totalAmount = 0;
      let totalAmountUsd = 0;
      let totalItem = 0;
      for (let o of order) {
        const {tourId} = o;

        if (o.quantity <= 0) {
          continue;
        }

        const dupIdx = tourIds.findIndex(item => item === tourId);
        if (dupIdx < 0) {
          tourIds.push(tourId);
        }

        let product = {
          price_id: o.price_id,
          quantity: o.quantity,
          amount: o.amount,
          usd_amount: o.usd_amount,
        };

        totalAmount += o.amount;
        totalAmountUsd += o.usd_amount;
        totalItem += o.quantity;

        const paymentProduct = await strapi.service('api::tour.tour').getPaymentProduct(tourId);
        strapi.log.info(JSON.stringify(paymentProduct));

        const dupPaymentIdx = paymentVnss.findIndex(item => item === paymentProduct.id);
        if (dupPaymentIdx < 0) {
          paymentVnss.push(paymentProduct.id);
        }

        if (!paymentProduct) {
          throw ValidationError(`Payment product missing ${tourId}`);
        }
        product['router_id'] = paymentProduct.routerId;
        finalOrder.push(product);
      }

      if (finalOrder.length === 0) {
        throw ValidationError(`Final order empty`);
      }

      //Create customer
      const customers = await strapi.entityService.findMany('api::customer.customer', {
        filters: {
          phone,
          country: countryCode
        },
        limit: 1
      });

      let customer;
      if (customers.length > 0) {
        customer = customers[0];
      } else {
        customer = await strapi.entityService.create('api::customer.customer', {
          data: customerData
        });
      }

      totalAmountUsd = parseFloat(totalAmountUsd.toFixed(2));

      let orderData = {
        customer: customer.id,
        tours: tourIds,
        customerName: customer.fullname,
        customerPhone: `${customer.country} ${customer.phone}`,
        customerEmail: customer.email,
        grandTotal: totalAmount,
        grandTotalUsd: totalAmountUsd,
        paymentType: paymentType,
        payment_vns_payment_products: paymentVnss,
        totalItem,
        status: "Waiting"
      };

      strapi.log.info(JSON.stringify(orderData));
      const orderModel = strapi.contentTypes[("api::order.order")];
      await strapi.entityValidator.validateEntityCreation(orderModel, orderData, {});
      let newOrder = await strapi.entityService.create('api::order.order', {
        data: orderData
      });

      let paymentData = {
        amount: totalAmount,
        usd_amount: totalAmountUsd,
        full_name: customer.fullname,
        phone_number: customer.phone,
        country_code: customer.country,
        email: customer.email,
        order: finalOrder
      };

      strapi.log.info(JSON.stringify(paymentData));

      let resData = null;
      try {
        const res = await strapi
          .plugin('payment-vns')
          .service('paymentVnsService')
          .createOrder('en', paymentType, paymentData);
        strapi.log.info(JSON.stringify(res.data));
        if (res.data.code !== 0) {
          throw new Error(JSON.stringify({
            message: res.data.message,
            error: res.data,
            params: paymentData,
          }));
        }
        resData = res.data;
      } catch (e) {
        if (e.response?.data) {
          await strapi.entityService.update('api::order.order', newOrder.id, {
            data: {
              paymentTokenRaw: JSON.stringify(e.response?.data),
              status: "Error"
            }
          });
          throw new ValidationError(e.response?.data)
        } else {
          await strapi.entityService.update('api::order.order', newOrder.id, {
            data: {
              paymentTokenRaw: e.message,
              status: "Error"
            }
          });
          throw new ValidationError(e.message);
        }
      }

      const retParams = new URLSearchParams(resData.data.split("?")[1]);
      let getToken;
      switch (paymentType) {
        case "paypal":
          getToken = retParams.get("token");
          break;
        case "vnpay":
          getToken = retParams.get("vnp_SecureHash");
          break;
        default:
          getToken = `Unknown payment type: ${paymentType}`;
          break;
      }
      newOrder = await strapi.entityService.update('api::order.order', newOrder.id, {
        data: {
          paymentToken: getToken,
          paymentTokenRaw: resData,
        }
      });

      ctx.body = {
        data: {
          order: newOrder,
          url: resData.data,
        },
      }
    } catch (e) {
      strapi.log.error(e);
      ctx.throw(500, e);
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
