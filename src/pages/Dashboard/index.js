import React from "react";
import "./style.scss";
import { useEffect } from "react";
import { getUserHistory } from "../../redux/Orders/orderActions";
import { useDispatch, useSelector } from "react-redux";
import OrderHistory from "../../components/OrderHistory";

const mapState = ({ user, orders }) => ({
  currentUser: user.currentUser,
  orders: orders.orderHistory.data,
});

function Dashboard() {
  const { currentUser, orders } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserHistory(currentUser.id));
  }, [currentUser.id, dispatch]);
  return (
    <div>
      <h1>Order History</h1>
      <OrderHistory oders={orders} />
    </div>
  );
}

export default Dashboard;
