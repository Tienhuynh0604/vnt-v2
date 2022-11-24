'use strict';

/**
 * sync-product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sync-product.sync-product');
