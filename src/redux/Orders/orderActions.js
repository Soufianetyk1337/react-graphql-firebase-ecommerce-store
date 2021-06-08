import { orderTypes } from "./orderTypes";

export const saveOrderHistory = (order) => ({
  type: orderTypes.SAVE_ORDER_HISTORY,
  payload: order,
});

export const getUserOrderHistory = (uid) => ({
  type: orderTypes.GET_USER_HISTORY,
  payload: uid,
});

export const setUserOrderHistory = (history) => ({
  type: orderTypes.SET_USER_HISTORY,
  payload: history,
});

export const setOrderDetails = (order) => ({
  type: orderTypes.SET_ORDER_DETAILS,
  payload: order,
});
export const getOrderDetails = (orderId) => ({
  type: orderTypes.GET_ORDER_DETAILS,
  payload: orderId,
});
