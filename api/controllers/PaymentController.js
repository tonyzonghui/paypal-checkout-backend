/**
 * PaymentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const PaypalService = require("../services/PaypalService");

module.exports = {
  checkoutPaypal(req, res) {
    console.log(req.body);

    let paymentJson = {
      payer_id: req.body.data.payerID,
    };
    const payment = {};
    payment.amount = req.body.data.amount;
    const paymentID = req.body.data.paymentID;
    PaypalService.paypalPayment(
      paymentID,
      paymentJson,
      payment,
      (err, result) => {
        if (err) {
          res.negotiate(err);
        } else {
          res.ok(result);
        }
      }
    );
  },
};
