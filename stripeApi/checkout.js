const stripeAPI = require("../stripe");
const stripe = require("stripe")(
  "sk_test_51OhvW7Gr7paNn0fxvVAsZIGBYQQRTp7jMvPHJ78uiwLtHR7xV0UNXkvMQo96zwBRKeb4FdS7pE9w544PBDXx8B6K00dRx0xf01"
);

async function createCheckoutSession(req, res) {
  const domianUrl = "http://localhost:3000";
  // const { line_items, customer_email } = req.body;
  // // check req body has line items and email
  // if (!line_items || !customer_email) {
  //   return res
  //     .status(400)
  //     .json({ error: "missing required session parameters" });
  // }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log(paymentIntent);

    res.status(200).json({ sessionId: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "an error occured" });
  }
}

module.exports = createCheckoutSession;
