'use strict';

/**
 * service-registration service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::service-registration.service-registration');
