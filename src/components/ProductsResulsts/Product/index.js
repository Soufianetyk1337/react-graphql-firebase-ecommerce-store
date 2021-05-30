import React from "react";
import Button from "../../Forms/Button";
function Product({
  productPrice,
  productThumbnail,
  productName,
  productIndex,
}) {
  if (!productThumbnail || !productName || typeof productPrice === "undefined")
    return null;
  const addToCartProps = {
    type: "button",
  };
  return (
    <div className="product">
      <div className="thumbnail">
        <img src={productThumbnail} alt={productName} srcset="" />
      </div>
      <div className="details">
        <ul>
          <li key={productIndex}>
            <span className="productName">{productName}</span>
          </li>
          <li key={productIndex + 1}>
            <span className="productPrice">${productPrice}</span>
          </li>
          <li>
            <Button {...addToCartProps}>Add to cart</Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Product;
