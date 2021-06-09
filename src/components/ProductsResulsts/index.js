/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/productActions";
import Product from "./Product";
import FormSelect from "./../../components/Forms/FormSelect";

import "./style.scss";
import { useHistory, useParams } from "react-router-dom";
import LoadMore from "../LoadMore";
const mapState = ({ product }) => ({
  products: product.products,
});
function ProductsResults() {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const { filterType } = useParams();
  const history = useHistory();
  const { data, queryDoc, isLastPage } = products;
  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);
  if (!Array.isArray(data)) return "Products in not an Array";
  if (data.length < 1) {
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
  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        offset: queryDoc,
        previousProducts: data,
      })
    );
  };
  const loadMoreProps = {
    onLoadMore: handleLoadMore,
  };
  return (
    <div className="products">
      <h1>Browse Products</h1>
      <FormSelect {...filterProps} />
      <div className="product__container bd-grid">
        {data.map((product, index) => {
          const { productPrice, productThumbnail, productName } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;
          const productProps = {
            ...product,
          };
          return <Product {...productProps} />;
        })}
      </div>
      {!isLastPage && <LoadMore {...loadMoreProps} />}
    </div>
  );
}

export default ProductsResults;
