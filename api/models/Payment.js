/**
 * Payment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    amount: {
      type: "integer",
    },
    email: {
      type: "string",
    },
    first_name: {
      type: "string",
    },
    last_name: {
      type: "string",
    },
  },
};
