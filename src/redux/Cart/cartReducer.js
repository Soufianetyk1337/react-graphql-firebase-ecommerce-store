import {
  checkIfItemsExistsInCart,
  handleDecreaseItemQuantity,
  handleRemoveCartItem,
} from "./cartHelpers";
import cartTypes from "./cartTypes";

const INITIAL_STATE = {
  cartItems: [],
};
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: checkIfItemsExistsInCart({
          previousCartItems: state.cartItems,
          nextCartItem: action.payload,
        }),
      };
    case cartTypes.DECREASE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: handleDecreaseItemQuantity({
          previousCartItems: state.cartItems,
          cartItemToDecrease: action.payload,
        }),
      };
    case cartTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: handleRemoveCartItem({
          previousCartItems: state.cartItems,
          cartItemToRemove: action.payload,
        }),
      };
    case cartTypes.CLEAR_CART:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default cartReducer;
