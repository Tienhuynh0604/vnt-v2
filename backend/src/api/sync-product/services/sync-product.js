'use strict';

/**
 * sync-product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sync-product.sync-product');
