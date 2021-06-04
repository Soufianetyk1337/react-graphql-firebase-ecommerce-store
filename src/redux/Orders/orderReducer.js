const { orderTypes } = require("./orderTypes");

const INITIAL_STATE = {
  orderHistory: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderTypes.SET_USER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
