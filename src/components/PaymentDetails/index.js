/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import FormInput from "../Forms/FormInput";
import { CountryDropdown } from "react-country-region-selector";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
//import "./style.scss";
import "./PaymentDetailsStyle.scss";
import Button from "../Forms/Button";
import {
  selectCartTotal,
  selectCartItemsQuantity,
  selectCartItems,
} from "../../redux/Cart/cartSelectors";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../utils";
import { createStructuredSelector } from "reselect";
import { clearCart } from "../../redux/Cart/cartActions";
import { saveOrderHistory } from "../../redux/Orders/orderActions";
import { Formik } from "formik";
import * as Yup from "yup";
const initialAdressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const shippingAdressinitialState = {
  shippingLine1: "",
  shippingLine2: "",
  shippingCity: "",
  shippingState: "",
  shippingPostalCode: "",
  shippingCountry: "",
};

const billingAdressinitialState = {
  billingLine1: "",
  billingLine2: "",
  billingCity: "",
  billingState: "",
  billingPostal_code: "",
  billingCountry: "",
};
const mapState = createStructuredSelector({
  totalPrice: selectCartTotal,
  quantity: selectCartItemsQuantity,
  cartItems: selectCartItems,
});
function PaymentDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { totalPrice, quantity, cartItems } = useSelector(mapState);
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

  useEffect(() => {
    if (quantity < 1) {
      history.push("/dashboard");
    }
  }, [history, quantity]);

  const handleFormSubmit = async (values) => {
    const cardElement = elements.getElement(CardElement);
    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }
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
        console.log(`clientSecret`, clientSecret);
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
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
                const orderProps = {
                  orderTotal: totalPrice,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentId,
                      productName,
                      productPrice,
                      quantity,
                      productThumbnail,
                    } = item;
                    return {
                      documentId,
                      productName,
                      productPrice,
                      quantity,
                      productThumbnail,
                    };
                  }),
                };
                dispatch(saveOrderHistory(orderProps));
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
      {/* <form>
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
            name="postal_code"
            value={shippingAddress.postal_code}
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
            name="postal_code"
            type="text"
            value={billingAddress.postal_code}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              valueType="short"
              handleChange={(event) => handleBilling(event)}
              name="country"
              value={billingAddress.country}
              onChange={(value) =>
                handleBilling({
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
      </form>*/}
      <Formik
        initialValues={{
          ...shippingAdressinitialState,
          ...billingAdressinitialState,
          nameOnCard,
          recipientName,
        }}
        onSubmit={async (values) => {
          console.log(values);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Required"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <form className="reset-form" onSubmit={handleSubmit}>
              <h2>Shipping Address</h2>
              <label htmlFor="recipientName" style={{ display: "block" }}>
                Recipient Name
              </label>
              <input
                id="recipientName"
                placeholder="Enter Recipient Name"
                type="text"
                value={values.recipientName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.recipientName && touched.recipientName
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.recipientName && touched.recipientName && (
                <div className="input-feedback">{errors.recipientName}</div>
              )}
              <label htmlFor="shippingLine1" style={{ display: "block" }}>
                Line 1
              </label>
              <input
                id="shippingLine1"
                placeholder="Enter First Address"
                type="text"
                value={values.shippingLine1}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.shippingLine1 && touched.shippingLine1
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.shippingLine1 && touched.shippingLine1 && (
                <div className="input-feedback">{errors.shippingLine1}</div>
              )}
              <label htmlFor="shippingLine2" style={{ display: "block" }}>
                Line 2
              </label>
              <input
                id="shippingLine2"
                placeholder="Enter Second Address"
                type="text"
                value={values.shippingLine2}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.shippingLine2 && touched.shippingLine2
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.shippingLine2 && touched.shippingLine2 && (
                <div className="input-feedback">{errors.shippingLine2}</div>
              )}
              <label htmlFor="shippingCity" style={{ display: "block" }}>
                City
              </label>
              <input
                id="shippingCity"
                placeholder="Enter your city"
                type="text"
                value={values.shippingCity}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.shippingCity && touched.shippingCity
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.shippingCity && touched.shippingCity && (
                <div className="input-feedback">{errors.shippingCity}</div>
              )}
              <label htmlFor="shippingState" style={{ display: "block" }}>
                State
              </label>
              <input
                id="shippingState"
                placeholder="Enter your state"
                type="text"
                value={values.shippingState}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.shippingState && touched.shippingState
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.shippingState && touched.shippingState && (
                <div className="input-feedback">{errors.shippingState}</div>
              )}
              <label htmlFor="shippingPostalCode" style={{ display: "block" }}>
                Postal Code
              </label>
              <input
                id="shippingPostalCode"
                placeholder="Enter your postal code"
                type="text"
                value={values.shippingPostalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.shippingPostalCode && touched.shippingPostalCode
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.shippingPostalCode && touched.shippingPostalCode && (
                <div className="input-feedback">
                  {errors.shippingPostalCode}
                </div>
              )}
              <label htmlFor="shippingCountry">Shipping Country</label>
              <CountryDropdown
                required
                valueType="short"
                handleChange={(event) => handleShipping(event)}
                name="country"
                value={values.shippingCountry}
                onChange={handleChange}
                className={
                  errors.shippingPostalCode && touched.shippingPostalCode
                    ? "input text-input error"
                    : "input text-input"
                }
                // onChange={(value) =>
                //   handleShipping({
                //     target: {
                //       name: "country",
                //       value,
                //     },
                //   })
                // }
              />
              {errors.shippingCountry && touched.shippingCountry && (
                <div className="input-feedback">{errors.shippingCountry}</div>
              )}
              <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>
              <button type="submit" disabled={isSubmitting}>
                Pay Now
              </button>
              <DisplayFormikState {...props} />
            </form>
          );
        }}
      </Formik>

      <Button type="submit" onClick={handleFormSubmit}>
        Pay Now
      </Button>
    </div>
  );
}
const DisplayFormikState = (props) => (
  <div style={{ margin: "1rem 0" }}>
    <h3 style={{ fontFamily: "monospace" }} />
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem",
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);
export default PaymentDetails;
