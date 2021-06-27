import React from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addToCart,
  decreaseItemQuantity,
} from "../../../redux/Cart/cartActions";
import "./style.scss";
function Item(product) {
  const {
    productName,
    productPrice,
    productThumbnail,
    quantity,
    documentId,
  } = product;
  const dispatch = useDispatch();
  const handleRemoveItemFromTheCart = (documentId) => {
    dispatch(removeCartItem({ documentId }));
  };
  const handleIncreaseQuantity = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseItemQuantity(product));
  };
  return (
    <table className="cartItem">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td className="quantityCell">
            <span
              className="cartButton"
              onClick={() => handleDecreaseQuantity(product)}
            >
              <i class="bx bx-minus"></i>{" "}
            </span>
            <span className="cartQuantity">{quantity}</span>
            <span
              className="cartButton"
              onClick={() => handleIncreaseQuantity(product)}
            >
              {" "}
              <i class="bx bx-plus"></i>
            </span>
          </td>
          <td>${productPrice}</td>
          <td align="center">
            <span
              className="cartButton"
              onClick={() => handleRemoveItemFromTheCart(documentId)}
            >
              <i class="bx bx-trash"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Item;
