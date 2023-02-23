'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'VnsPriceList',
    plugin: 'payment-vns',
    type: 'json',
  });
  // registeration phase
  Object.values(strapi.contentTypes).forEach(contentType => {
    // If this is an api content-type
    if (contentType.uid === "api::tour.tour") {
      // Add tasks property to the content-type
      contentType.attributes.paymentProduct = {
        type: 'relation',
        relation: 'oneToOne',
        target: 'plugin::payment-vns.payment-product', // internal slug of the target
        // configurable: false,
        private: false,
        "pluginOptions": {
          "i18n": {
            "localized": false
          }
        },
      };
    }
  });
};
