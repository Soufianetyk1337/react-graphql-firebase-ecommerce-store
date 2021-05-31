import { checkIfItemsExistsInCart } from "./cartHelpers";
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

    default:
      return state;
  }
};

export default cartReducer;
