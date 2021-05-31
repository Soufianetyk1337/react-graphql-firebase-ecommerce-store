import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/Cart/cartActions";
import Button from "../../Forms/Button";
function Product(product) {
  const {
    productPrice,
    productThumbnail,
    productName,
    documentId: productId,
  } = product;
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
  const mapState = ({ cartItems }) => ({
    cartItems: cartItems.cartItems,
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch(mapState);

  const handleAddToCart = (product) => {
    console.log(`Add To Cart`);
    if (!product) return;
    dispatch(addToCart(product));
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
            <Button
              {...addToCartProps}
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Product;
