import React from "react";

function Product({
  productPrice,
  productThumbnail,
  productName,
  productIndex,
}) {
  if (!productThumbnail || !productName || typeof productPrice === "undefined")
    return null;
  return (
    <div className="product">
      <div className="thumbnail">
        <img src={productThumbnail} alt={productName} srcset="" />
      </div>
      <div className="details">
        <ul>
          <li key={productIndex}>
            <span>{productName}</span>
          </li>
          <li key={productIndex}>
            <span>{productPrice}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Product;
