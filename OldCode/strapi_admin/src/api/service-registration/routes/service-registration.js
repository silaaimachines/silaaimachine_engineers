'use strict';

/**
 * service-registration router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::service-registration.service-registration');
