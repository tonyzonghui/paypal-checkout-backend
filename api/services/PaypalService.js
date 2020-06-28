const paypal = require("paypal-rest-sdk");
const Payment = require("../models/Payment");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AerndAFr7KTaC7BXhys-IpUzr-K27LJbhHm-K-pSxYXdNaq5JV878CTsFVicw7GwDZ0g-iSvhBelAnUE",
  client_secret:
    "ECBmsF-o8AQ6pRmqEz4p8JHvSMYFzICDAAp1cBx2mI-yTt5XLTH--uzVB5_1kJw6s1alAtgzw8-XmWWt",
});

module.exports = {
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
