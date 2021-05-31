import React from "react";
import { Link } from "react-router-dom";
import Button from "../../Forms/Button";
function Product({
  productPrice,
  productThumbnail,
  productName,
  documentId: productId,
}) {
  if (
    !productId ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;
  const addToCartProps = {
    type: "button",
  };
  return (
    <div className="product">
      <div className="thumbnail">
        <Link to={`/product/${productId}`}>
          <img src={productThumbnail} alt={productName} srcset="" />
        </Link>
      </div>
      <div className="details">
        <ul>
          <li key={productId}>
            <Link to={`/product/${productId}`}>
              <span className="productName">{productName}</span>
            </Link>
          </li>
          <li key={productId + 1}>
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
