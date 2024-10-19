'use strict';

/**
 * service-registration controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service-registration.service-registration');
