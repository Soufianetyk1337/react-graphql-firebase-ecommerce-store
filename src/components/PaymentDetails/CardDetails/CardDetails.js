import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
const cardElementProps = {
  iconStyle: "solid",
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true,
};
function CardDetails({ state }) {
  return (
    <div className="group">
      <h2>Card Details </h2>
      <CardElement options={cardElementProps} />
    </div>
  );
}

export default CardDetails;
