/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import FormInput from "../Forms/FormInput";
import { CountryDropdown } from "react-country-region-selector";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./style.scss";
import Button from "../Forms/Button";
import { selectCartTotal } from "../../redux/Cart/cartSelectors";
import { useSelector } from "react-redux";
import { api } from "../../utils";
import { createStructuredSelector } from "reselect";
const initialAdressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

const mapState = createStructuredSelector({
  totalPrice: selectCartTotal,
});
function PaymentDetails() {
  const { totalPrice } = useSelector(mapState);
  const stripe = useStripe();
  const elements = useElements();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAdressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAdressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const handleFormSubmit = async (event) => {
    console.log(`Form Submitted`);
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postalCode ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postalCode ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    )
      return;

    api
      .post("/payments/create", {
        amount: totalPrice * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billingDetails: {
              name: nameOnCard,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then((paymentIntent) => {
                console.log(`paymentIntent`, paymentIntent);
              });
          });
      });
  };

  const handleShipping = (event) => {
    const { name, value } = event.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (event) => {
    const { name, value } = event.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
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
  return (
    <div className="paymentDetails">
      <form>
        <div className="group">
          <h2>Shipping Address</h2>
          <FormInput
            required
            placeholder="Recipient 1"
            name="recipientName"
            value={recipientName}
            handleChange={(e) => setRecipientName(e.target.value)}
            type="text"
          />
          <FormInput
            required
            placeholder="Line 1"
            handleChange={(event) => handleShipping(event)}
            name="line1"
            value={shippingAddress.line1}
            type="text"
          />

          <FormInput
            placeholder="Line 2"
            handleChange={(event) => handleShipping(event)}
            name="line2"
            type="text"
            value={shippingAddress.line2}
          />
          <FormInput
            required
            placeholder="City"
            handleChange={(event) => handleShipping(event)}
            name="city"
            type="text"
            value={shippingAddress.city}
          />

          <FormInput
            required
            placeholder="State"
            handleChange={(event) => handleShipping(event)}
            type="text"
            name="state"
            value={shippingAddress.state}
          />
          <FormInput
            required
            placeholder="Postal Code"
            handleChange={(event) => handleShipping(event)}
            type="text"
            name="postalCode"
            value={shippingAddress.postalCode}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              valueType="short"
              handleChange={(event) => handleShipping(event)}
              className=""
              name="country"
              value={shippingAddress.country}
              onChange={(value) =>
                handleShipping({
                  target: {
                    name: "country",
                    value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="group">
          <h2>Billing Address</h2>
          <FormInput
            required
            placeholder="Name on Card"
            type="text"
            name="nameOnCard"
            handleChange={(e) => setNameOnCard(e.target.value)}
            value={nameOnCard}
          />
          <FormInput
            required
            placeholder="Line 1"
            handleChange={(event) => handleBilling(event)}
            name="line1"
            type="text"
            value={billingAddress.line1}
          />

          <FormInput
            placeholder="Line 2"
            handleChange={(event) => handleBilling(event)}
            name="line2"
            type="text"
            value={billingAddress.line2}
          />
          <FormInput
            required
            placeholder="City"
            handleChange={(event) => handleBilling(event)}
            name="city"
            type="text"
            value={billingAddress.city}
          />

          <FormInput
            required
            placeholder="State"
            handleChange={(event) => handleBilling(event)}
            name="state"
            type="text"
            value={billingAddress.state}
          />
          <FormInput
            required
            placeholder="Postal Code"
            handleChange={(event) => handleBilling(event)}
            name="postalCode"
            type="text"
            value={billingAddress.postCode}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              valueType="short"
              handleChange={(event) => handleBilling(event)}
              name="country"
              value={billingAddress.country}
              onChange={(value) =>
                handleShipping({
                  target: {
                    name: "country",
                    value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="group">
          <h2>Card Details </h2>
          <CardElement options={cardElementProps} />
        </div>
      </form>
      <Button type="submit" onClick={handleFormSubmit}>
        Pay Now
      </Button>
    </div>
  );
}

export default PaymentDetails;
