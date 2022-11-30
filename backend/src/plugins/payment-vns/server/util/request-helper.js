const axios = require('axios');

let axiosInstance = null;

module.exports.request = async ({strapi}) => {
  if (!axiosInstance) {
    const settings = await strapi.plugin("payment-vns")
      .service('paymentVnsService')
      .getSettings();
    const {apiUrl, apiKey} = settings;
    axiosInstance = axios.create({
      baseURL: apiUrl,
      headers: {
        'x-access-srkey': apiKey
      }
    });
  }

  return axiosInstance;
};
