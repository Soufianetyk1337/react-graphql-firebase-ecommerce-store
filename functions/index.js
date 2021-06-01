/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.get("*", (req, res) => {
  res.status(400).send("404 not Found");
});
exports.api = functions.https.onRequest(app);
