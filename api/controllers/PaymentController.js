/**
 * PaymentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const PaypalService = require("../services/PaypalService");

module.exports = {
  createPayment(req, res) {
    // call payment service to create payment on paypal
    console.log(req.body);

    try {
      const amount = req.body.data.amount;
      const currency = req.body.data.currency;
      PaypalService.createPayment(amount, currency, (error, result) => {
        if (error) {
          res.negotiate(error);
        } else {
          res.ok(result);
        }
      });
    } catch (error) {
      console.log(error);

      res.serverError();
    }
  },

  checkoutPaypal(req, res) {
    console.log(req.body);

    try {
      const orderID = req.body.orderID;
      PaypalService.captureOrderPayment(orderID, (error, result) => {
        if (error) {
          res.negotiate(error);
        } else {
          res.ok(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.serverError();
    }
  },
};
