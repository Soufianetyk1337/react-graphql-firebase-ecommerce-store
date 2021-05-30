/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/productActions";
import Product from "./Product";
import "./style.scss";
const mapState = ({ product }) => ({
  products: product.products,
});
function ProductsResults() {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);
  if (!Array.isArray(products)) return "Products in not an Array";
  if (products.length < 1) {
    return (
      <div className="products">
        <p>No Search Results</p>
      </div>
    );
  }
  return (
    <div className="products">
      {products.map((product, index) => {
        const { productPrice, productThumbnail, productName } = product;
        if (
          !productThumbnail ||
          !productName ||
          typeof productPrice === "undefined"
        )
          return null;
        const productProps = {
          productPrice,
          productThumbnail,
          productName,
          productIndex: index,
        };
        return <Product {...productProps} />;
      })}
    </div>
  );
}

export default ProductsResults;
