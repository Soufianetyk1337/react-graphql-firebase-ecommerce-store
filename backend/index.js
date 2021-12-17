//eslint disable-unused-vars
require("dotenv").config();
let cors_options = {
  origin: "*",

  preflightContinue: false,
  optionsSuccessStatus: 204,
};
const express = require("express");
const cors = require("cors")(cors_options);
const stripe = require("stripe")(
  process.env.STRIKE_KEY
);
const consola = require("consola");
const volleyball = require("volleyball");

const app = express();
app.use(cors);
app.use(volleyball);
app.use(express.static("."));
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/payments/create", async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: "usd",
    });
    res.send(paymentIntent.client_secret);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
});
app.listen(port, () => {
  consola.success(`Example app listening at http://localhost:${port}`);
});
