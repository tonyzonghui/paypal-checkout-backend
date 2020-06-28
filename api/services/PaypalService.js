const paypal = require("paypal-rest-sdk");
const Payment = require("../models/Payment");

paypal.configure({
  mode: sails.config.paypal.mode,
  client_id: sails.config.paypal.clientId,
  client_secret: sails.config.paypal.clientSecret,
});

module.exports = {
  createPayment(amount, currency, callback) {
    let paymentJson = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      transactions: [
        {
          amount: {
            total: amount,
            currency: currency,
          },
        },
      ],
      redirect_urls: {
        return_url: "http://localhost:8080",
        cancel_url: "http://localhost:8080",
      },
    };
    console.log(JSON.stringify(paymentJson));

    paypal.payment.create(paymentJson, (error, response) => {
      if (error) {
        console.log("create payment error: ", JSON.stringify(error));
        return callback(error);
      } else {
        console.log("create payment result: ", response);

        return callback(null, { id: response.id });
      }
    });
  },

  paypalPayment(paymentID, paymentJson, payment, callback) {
    paypal.payment.execute(paymentID, paymentJson, (error, paymentLog) => {
      if (error) {
        console.log("error: ", error);

        return callback(error);
      } else {
        console.log("payment success: ", paymentLog);

        payment.email = paymentLog.payer.payer_info.email;
        payment.first_name = paymentLog.payer.payer_info.first_name;
        payment.last_name = paymentLog.payer.payer_info.last_name;
        console.log(payment);
        callback(null, "done");
        // Payment.create(payment).exec((err, result) => {
        //   callback(null, "done");
        // });
      }
    });
  },
};
