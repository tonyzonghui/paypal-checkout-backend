const paypal = require("paypal-rest-sdk");
const Payment = require("../models/Payment");
const axios = require("axios");

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

    this.callPaypalCreatePaymentAPI(paymentJson)
      .then((result) => {
        console.log("create payment result: ", response);
        return callback(null, { id: response.id });
      })
      .catch((error) => {
        console.log("create payment error: ", JSON.stringify(error));
        return callback(error);
      });
    // paypal.payment.create(paymentJson, (error, response) => {
    //   if (error) {
    //     console.log("create payment error: ", JSON.stringify(error));
    //     return callback(error);
    //   } else {
    //     console.log("create payment result: ", response);
    //     return callback(null, { id: response.id });
    //   }
    // });
  },

  executePayment(paymentID, paymentJson, payment, callback) {
    this.callPaypalExecutePaymentAPI(paymentID, paymentJson)
      .then((paymentLog) => {
        console.log("payment success: ", paymentLog);
        payment.email = paymentLog.payer.payer_info.email;
        payment.first_name = paymentLog.payer.payer_info.first_name;
        payment.last_name = paymentLog.payer.payer_info.last_name;
        console.log(payment);
        callback(null, payment);
      })
      .catch((error) => {
        console.log("error: ", error);
        return callback(error);
      });
    // paypal.payment.execute(paymentID, paymentJson, (error, paymentLog) => {
    //   if (error) {
    //     console.log("error: ", error);

    //     return callback(error);
    //   } else {
    //     console.log("payment success: ", paymentLog);

    //     payment.email = paymentLog.payer.payer_info.email;
    //     payment.first_name = paymentLog.payer.payer_info.first_name;
    //     payment.last_name = paymentLog.payer.payer_info.last_name;
    //     console.log(payment);
    //     callback(null, payment);
    //     // Payment.create(payment).exec((err, result) => {
    //     //   callback(null, "done");
    //     // });
    //   }
    // });
  },

  callPaypalCreatePaymentAPI(paymentJson) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          sails.config.paypal.apiBaseUrl + "/v1/payments/payment",
          this.constructPaypalRequestJson(paymentJson)
        )
        .then((result) => {
          return resolve(result);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  },

  callPaypalExecutePaymentAPI(paymentID, paymentJson) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          sails.config.paypal.apiBaseUrl +
            "/v1/payments/payment" +
            paymentID +
            "/execute",
          this.constructPaypalRequestJson(paymentJson)
        )
        .then((result) => {
          return resolve(result);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  },

  constructPaypalRequestJson(bodyJson) {
    return {
      auth: {
        user: sails.config.paypal.clientId,
        pass: sails.config.paypal.clientSecret,
      },
      body: bodyJson,
      json: true,
    };
  },
};
