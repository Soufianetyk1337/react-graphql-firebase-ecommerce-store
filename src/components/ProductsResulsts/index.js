/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/productActions";
import Product from "./Product";
import FormSelect from "./../../components/Forms/FormSelect";

import "./style.scss";
import { useHistory, useParams } from "react-router-dom";
const mapState = ({ product }) => ({
  products: product.products,
});
function ProductsResults() {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const { filterType } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);
  if (!Array.isArray(products)) return "Products in not an Array";
  if (products.length < 1) {
    return (
      <div className="products">
        <p>No Search Results</p>
      </div>
    );
  }
  const handleFilter = (event) => {
    const redirectTo = event.target.value;
    history.push(`/search/${redirectTo}`);
  };
  const filterProps = {
    defaultValue: filterType,
    options: [
      {
        name: "Show All",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },

      {
        name: "Womens",
        value: "womens",
      },
    ],
    handleChange: handleFilter,
  };
  return (
    <div className="products">
      <h1>Browse Products</h1>
      <FormSelect {...filterProps} />
      <div className="productsResults">
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
    </div>
  );
}

export default ProductsResults;
