const { orderTypes } = require("./orderTypes");

const INITIAL_STATE = {
  orderHistory: [],
  orderDetails: {},
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderTypes.SET_USER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload,
      };
    case orderTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
