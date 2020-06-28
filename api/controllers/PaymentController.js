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

    const amount = req.body.data.amount;
    const currency = req.body.data.currency;
    PaypalService.createPayment(amount, currency, (error, result) => {
      if (error) {
        res.negotiate(error);
      } else {
        res.ok(result);
      }
    });
  },

  checkoutPaypal(req, res) {
    console.log(req.body);

    let paymentJson = {
      payer_id: req.body.data.payerID,
    };
    const payment = {};
    payment.amount = req.body.data.amount;
    const paymentID = req.body.data.paymentID;
    PaypalService.executePayment(
      paymentID,
      paymentJson,
      payment,
      (error, result) => {
        if (error) {
          res.negotiate(error);
        } else {
          res.ok(result);
        }
      }
    );
  },
};
