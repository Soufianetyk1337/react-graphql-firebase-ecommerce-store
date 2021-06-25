import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/Cart/cartActions";
import Button from "../../Forms/Button";
import "./ProductStyle.scss";
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
    <article className="product">
      <div className="product__sale">New</div>
      <Link to={`/product/${productId}`}>
        <img
          className="product__img"
          src={productThumbnail}
          alt={productName}
        />
      </Link>
      <Link to={`/product/${productId}`}>
        <div className="product__name">{productName}</div>
      </Link>
      <div className="product__price">${productPrice} 00</div>
      <Button {...addToCartProps} onClick={() => handleAddToCart(product)}>
        Add to cart
      </Button>
    </article>
  );
}

export default Product;
