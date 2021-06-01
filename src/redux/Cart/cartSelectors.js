const { createSelector } = require("reselect");

const selectorCartItems = (state) => state.cartItems;

export const selectCartItems = createSelector(
  [selectorCartItems],
  (cartItems) => cartItems.cartItems
);

export const selectCartItemsQuantity = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (quantity, cartItem) =>
      quantity + cartItem.quantity * cartItem.productPrice,
    0
  )
);
