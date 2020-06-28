const paypal = require("@paypal/checkout-server-sdk");
const paypalClient = require("../commons/PaypalClient");

module.exports = {
  createPayment(amount, currency, callback) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
        },
      ],
    });
    paypalClient
      .client()
      .execute(request)
      .then((order) => {
        console.log("order: ", order);
        return callback(null, { orderID: order.result.id });
      })
      .catch((error) => {
        console.log("error: ", error);
        return callback(error);
      });
  },

  captureOrderPayment(orderID, callback) {
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    paypalClient
      .client()
      .execute(request)
      .then((capture) => {
        console.log("capture: ", JSON.stringify(capture));
        let payment = {};
        payment.email = capture.result.payer.email_address;
        payment.first_name = capture.result.payer.name.given_name;
        payment.last_name = capture.result.payer.name.surname;
        callback(null, payment);
      })
      .catch((error) => {
        console.log("error: ", error);
        callback(error);
      });
  },
};
