import cartTypes from "./cartTypes";

export const addToCart = (cartItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: cartItem,
});
