import React, { useEffect } from "react";
import "./style.scss";

import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../redux/Orders/orderActions";

function OrderDetails({ order }) {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
  }, [dispatch]);
  const orderItems = order && order.orderItems;
  return (
    <div className="productdetail__container">
      {Array.isArray(orderItems) &&
        orderItems.length > 0 &&
        orderItems.map((row, index) => {
          console.log("row", row);
          const {
            productThumbnail,
            productName,
            productPrice,
            productId,
            quantity,
          } = row;
          return (
            <article className="productdetail">
              <img
                className="productdetail__img"
                src={productThumbnail}
                alt={productName}
              />
              <div className="productdetail__name">{productName}</div>
              <div className="productdetail__subtitle">
                Quantity: {quantity}
              </div>
              <div className="productdetail__subtitle">
                Price: {productPrice}
              </div>
              <div className="productdetail__price">
                Total: ${productPrice * quantity}
              </div>
            </article>
          );
        })}
    </div>
  );
}

export default OrderDetails;
