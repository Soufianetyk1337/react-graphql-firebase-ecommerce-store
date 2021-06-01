import React from "react";
import "./style.scss";
function Item(product) {
  const {
    productName,
    productPrice,
    productThumbnail,
    quantity,
    documentId,
  } = product;
  return (
    <table className="cartItem">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>{quantity}</td>
          <td>${productPrice}</td>
          <td align="center">
            <span>X</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Item;
