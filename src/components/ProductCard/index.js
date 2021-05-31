/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleProductStart,
  setProduct,
} from "../../redux/Products/productActions";
import Button from "../Forms/Button";
const mapState = ({ product }) => ({
  product: product.product,
});
function ProductCardDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector(mapState);

  const {
    productName,
    productAdminUserUID,
    productThumbnail,
    productPrice,
    productDesc,
  } = product;
  const addToCartProps = {
    type: "button",
  };
  useEffect(() => {
    dispatch(fetchSingleProductStart(productId));
    return () => {
      dispatch(setProduct({}));
    };
  }, []);
  return (
    <div className="productCard">
      <div className="thumbnail">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>{productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button {...addToCartProps}>Add To Cart</Button>
            </div>
          </li>
          <li>
            <span dangerouslySetInnerHTML={{ __html: productDesc }}></span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductCardDetails;
