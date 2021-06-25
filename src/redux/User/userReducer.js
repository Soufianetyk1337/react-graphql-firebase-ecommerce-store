import userTypes from "./userTypes";

const INITIAL_STATE = {
  currentUser: null,
  userError: [],
  resetPasswordSuccess: false,
};

// eslint-disable-next-line no-unused-vars
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case userTypes.SET_CURRENT_USER:
    //   return {
    //     ...state,
    //     currentUser: action.payload,
    //   };
    // case userTypes.SIGN_IN_SUCCESS:
    //   return {
    //     ...state,
    //     signInSuccess: action.payload,
    //   };
    // case userTypes.SIGN_UP_ERROR:
    //   return {
    //     ...state,
    //     signUpError: action.payload,
    //   };
    // case userTypes.SIGN_UP_SUCCESS:
    //   return {
    //     ...state,
    //     signUpSuccess: action.payload,
    //   };
    // case userTypes.RESET_PASSWORD_SUCCESS:
    //   return {
    //     ...state,
    //     resetPasswordSuccess: action.payload,
    //   };
    // case userTypes.RESET_PASSWORD_ERROR:
    //   return {
    //     ...state,
    //     resetPasswordError: action.payload,
    //   };
    // case userTypes.RESET_AUTH_FORMS:
    //   return {
    //     ...state,

    //     signInSuccess: false,
    //     signUpError: [],
    //     signUpSuccess: false,
    //     resetPasswordSuccess: false,
    //     resetPasswordError: [],
    //   };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SIGN_OUT_USER_SUCCESS:
    case userTypes.RESET_USER_STATE:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    case userTypes.USER_ERROR:
      return {
        ...state,
        userError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
