import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/Cart/cartSelectors";
import "./style.scss";
import { createStructuredSelector } from "reselect";
import Button from "../Forms/Button";
import Item from "./Item";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
});

function Checkout() {
  const { cartItems } = useSelector(mapState);
  return (
    <div className="checkout">
      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <table border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </tbody>
                </table>
              </tr>
              <tr>
                <table border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                    {cartItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Item {...item} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </tr>
              <tr>
                <table align="left" border="0" cellPadding="0" cellSpacing="10">
                  <tr align="left">
                    <td>
                      <h3>Total:</h3>
                    </td>
                  </tr>
                  <tr>
                    <table
                      align="left"
                      border="0"
                      cellPadding="0"
                      cellSpacing="10"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <Button>Continue Shopping</Button>
                          </td>
                          <td>
                            <Button>Checkout</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>You have no Items in your cart</p>
        )}
      </div>
    </div>
  );
}

export default Checkout;
