import React from "react";
import PaymentDetails from "../../components/PaymentDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLISHABLE_KEY } from "./../../stripe/config";

const stripePromise = loadStripe(PUBLISHABLE_KEY);

function Payment() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentDetails />;
      </Elements>
    </>
  );
}

export default Payment;
