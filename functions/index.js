/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  // eslint-disable-next-line max-len
  "sk_test_51IxsrWGnVIIwkNMefw8xj9PEGwIFysvI5L4VmVqyr5Hedpo41QnLO3Tut2fGmbHOYjb1e94Hd6Ksam28lu6SA7cl00DqThMuy7"
);
const app = express();
app.use(cors({ origin: true }));

app.get("/payments/create", async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: "usd",
    });
    res.status(200).send(paymentIntent.client_secret);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
});
app.get("*", (req, res) => {
  res.status(400).send("404 not Found");
});
exports.api = functions.https.onRequest(app);
