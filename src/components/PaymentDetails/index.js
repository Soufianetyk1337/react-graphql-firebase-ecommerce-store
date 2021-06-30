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
  billingPostalCode: "",
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
    ...billingAdressinitialState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...shippingAdressinitialState,
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
      <div className="formWrapper">
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
            shippingLine1: Yup.string()
              .required("Required")
              .matches(
                /^[#.0-9a-zA-Z\s,-]+$/,
                "Address Should not have any Special Characters except #"
              )
              .min("10", "Shipping Address Must be  at least 10 Digits"),
            shippingLine2: Yup.string()
              .matches(
                /^[#.0-9a-zA-Z\s,-]+$/,
                "Address Should not have any Special Characters except #"
              )
              .min("10", "Shipping Address Must be  at least 10 Digits"),
            shippingCity: Yup.string()
              .required("Required")
              .matches(
                /^[a-zA-Z]+( [a-zA-Z]+)*$/,
                "Only Alphabets and space between words are allowed."
              )
              .min("4", "City should be at least 4 characters"),
            shippingState: Yup.string()
              .required("Required")
              .matches(
                /^[a-zA-Z]+( [a-zA-Z]+)*$/,
                "Only Alphabets and space between words are allowed."
              )
              .min("4", "State should be at least 4 characters"),

            shippingPostalCode: Yup.string()
              .required("Required")
              .matches(/[0-9]/, "Postal Code should Only contain numbers.")
              .min("5", "Postal Code Must be exactly 5 Digits"),

            billingLine1: Yup.string()
              .required("Required")
              .matches(
                /^[#.0-9a-zA-Z\s,-]+$/,
                "Address Should not have any Special Characters except #"
              )
              .min("25", "Shipping Address Must be  at least 25 Digits"),
            billingLine2: Yup.string()
              .matches(
                /^[#.0-9a-zA-Z\s,-]+$/,
                "Address Should not have any Special Characters except #"
              )
              .min("25", "Shipping Address Must be  at least 25 Digits"),
            billingCity: Yup.string()
              .required("Required")
              .matches(
                /^[a-zA-Z]+( [a-zA-Z]+)*$/,
                "Only alphabets and one space between words are allowed"
              )
              .min("4", "City should be at least 4 characters"),
            billingState: Yup.string()
              .required("Required")
              .matches(
                /^[a-zA-Z]+( [a-zA-Z]+)*$/,
                "Only alphabets and one space between words are allowed"
              )
              .min("4", "State should be at least 4 characters"),

            billingPostalCode: Yup.string()
              .required("Required")
              .matches(/[0-9]/, "Postal Code should Only contain numbers.")
              .min("5", "Postal Code Must be exactly 5 Digits"),
            nameOnCard: Yup.string()
              .required("Required")
              .matches(
                /^[a-zA-Z]+( [a-zA-Z]+)*$/,
                "Only alphabets and one space between words are allowed"
              )
              .min("6", "Name on card Should be at least 6 characters"),
            recipientName: Yup.string()
              .required("Required")
              .matches(
                /^[a-zA-Z]+( [a-zA-Z]+)*$/,
                "Only alphabets and one space between words are allowed"
              )
              .min("6", "Recipient name Should be at least 6 characters"),
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
              <>
                <h2 className="headline">Order Payment Details</h2>
                <form className="payment-form" onSubmit={handleSubmit}>
                  <div className="form-group">
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
                      <div className="input-feedback">
                        {errors.recipientName}
                      </div>
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
                      <div className="input-feedback">
                        {errors.shippingLine1}
                      </div>
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
                      <div className="input-feedback">
                        {errors.shippingLine2}
                      </div>
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
                      <div className="input-feedback">
                        {errors.shippingCity}
                      </div>
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
                      <div className="input-feedback">
                        {errors.shippingState}
                      </div>
                    )}
                    <label
                      htmlFor="shippingPostalCode"
                      style={{ display: "block" }}
                    >
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
                    {errors.shippingPostalCode &&
                      touched.shippingPostalCode && (
                        <div className="input-feedback">
                          {errors.shippingPostalCode}
                        </div>
                      )}
                    <label htmlFor="shippingCountry">Shipping Country</label>
                    <CountryDropdown
                      required
                      valueType="short"
                      id="shippingCountry"
                      name="shippingCountry"
                      defaultOptionLabel="Choose Shipping Country"
                      value={values.shippingCountry}
                      onChange={(event, value) => {
                        handleChange(value);
                      }}
                      className={
                        errors.shippingCountry && touched.shippingCountry
                          ? "input text-input error"
                          : "input text-input"
                      }
                    />
                    {errors.shippingCountry && touched.shippingCountry && (
                      <div className="input-feedback">
                        {errors.shippingCountry}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <h2>Billing Address</h2>
                    <label htmlFor="nameOnCard" style={{ display: "block" }}>
                      Recipient Name
                    </label>
                    <input
                      id="nameOnCard"
                      placeholder="Enter Your Name On Card"
                      type="text"
                      value={values.nameOnCard}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.nameOnCard && touched.nameOnCard
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.nameOnCard && touched.nameOnCard && (
                      <div className="input-feedback">{errors.nameOnCard}</div>
                    )}
                    <label htmlFor="billingLine1" style={{ display: "block" }}>
                      Line 1
                    </label>
                    <input
                      id="billingLine1"
                      placeholder="Enter First Address"
                      type="text"
                      value={values.billingLine1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.billingLine1 && touched.billingLine1
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.billingLine1 && touched.billingLine1 && (
                      <div className="input-feedback">
                        {errors.billingLine1}
                      </div>
                    )}
                    <label htmlFor="billingLine2" style={{ display: "block" }}>
                      Line 2
                    </label>
                    <input
                      id="billingLine2"
                      placeholder="Enter Second Address"
                      type="text"
                      value={values.billingLine2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.billingLine2 && touched.billingLine2
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.billingLine2 && touched.billingLine2 && (
                      <div className="input-feedback">
                        {errors.billingLine2}
                      </div>
                    )}
                    <label htmlFor="billingCity" style={{ display: "block" }}>
                      City
                    </label>
                    <input
                      id="billingCity"
                      placeholder="Enter your city"
                      type="text"
                      value={values.billingCity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.billingCity && touched.billingCity
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.billingCity && touched.billingCity && (
                      <div className="input-feedback">{errors.billingCity}</div>
                    )}
                    <label htmlFor="billingState" style={{ display: "block" }}>
                      State
                    </label>
                    <input
                      id="billingState"
                      placeholder="Enter your state"
                      type="text"
                      value={values.billingState}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.billingState && touched.billingState
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.billingState && touched.billingState && (
                      <div className="input-feedback">
                        {errors.billingState}
                      </div>
                    )}
                    <label
                      htmlFor="billingPostalCode"
                      style={{ display: "block" }}
                    >
                      Postal Code
                    </label>
                    <input
                      id="billingPostalCode"
                      placeholder="Enter your postal code"
                      type="text"
                      value={values.billingPostalCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.billingPostalCode && touched.billingPostalCode
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.billingPostalCode && touched.billingPostalCode && (
                      <div className="input-feedback">
                        {errors.billingPostalCode}
                      </div>
                    )}
                    <label htmlFor="billingCountry">Shipping Country</label>
                    <CountryDropdown
                      required
                      valueType="short"
                      name="billingCountry"
                      defaultOptionLabel="Choose Billing Country"
                      value={values.billingCountry}
                      onChange={(event, value) => {
                        handleChange(value);
                      }}
                      className={
                        errors.billingPostalCode && touched.billingPostalCode
                          ? "input text-input error"
                          : "input text-input"
                      }
                    />
                    {errors.billingCountry && touched.billingCountry && (
                      <div className="input-feedback">
                        {errors.billingCountry}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <h2>Card Details </h2>
                    <div className="visa-feedback">
                      Visa : 4242 4242 4242 4242 08/21 812
                    </div>
                    <CardElement options={cardElementProps} />
                  </div>
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
              </>
            );
          }}
        </Formik>
      </div>
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
