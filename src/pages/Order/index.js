import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OrderDetails from "../../components/OrderDetails";
import { getOrderDetails } from "../../redux/Orders/orderActions";
const mapState = ({ orders }) => ({
  orderDetails: orders.orderDetails,
});
function Order() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const orderTotal = orderDetails.orderTotal;
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);
  return (
    <div>
      <h1>Order ID:#{orderId}</h1>
      <OrderDetails order={orderDetails} />
      <h3>Total : {orderTotal}</h3>
    </div>
  );
}

export default Order;
