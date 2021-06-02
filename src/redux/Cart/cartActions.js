import cartTypes from "./cartTypes";

export const addToCart = (cartItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: cartItem,
});

export const removeCartItem = (cartItem) => ({
  type: cartTypes.REMOVE_CART_ITEM,
  payload: cartItem,
});

export const decreaseItemQuantity = (cartItem) => ({
  type: cartTypes.DECREASE_ITEM_QUANTITY,
  payload: cartItem,
});

export const clearCart = (cartItem) => ({
  type: cartTypes.CLEAR_CART,
});
