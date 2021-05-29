import { auth, googleProvider } from "../../firebase/utils";
import userTypes from "./userTypes";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({ type: userTypes.SIGN_IN_SUCCESS, payload: true });
  } catch (error) {
    console.error(error);
  }
};

// export const signUpUser = ({
//   displayName,
//   email,
//   password,
//   confirmPassword,
// }) => async (dispatch) => {
//   if (password !== confirmPassword) {
//     const error = ["Password don't match"];
//     dispatch({ type: userTypes.SIGN_UP_ERROR, payload: error });
//     return;
//   }

//   try {
//     const { user } = await auth.createUserWithEmailAndPassword(email, password);
//     await handleUserProfile({ user, displayName });
//     dispatch({
//       type: userTypes.SIGN_UP_SUCCESS,
//       payload: true,
//     });
//   } catch (error) {
//     console.error(`error`, error);
//   }
// };

export const resetPassword = ({ email }) => async (dispatch) => {
  const config = {
    url: "http://localhost:3000/login", // Redirect page after submiting the reset form
  };
  try {
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        console.log("Password Reset");
        dispatch({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true,
        });
      })
      .catch(() => {
        dispatch({
          type: userTypes.RESET_PASSWORD_ERROR,
          payload: [
            "There is no user record corresponding to this identifier. The user may have been deleted.",
          ],
        });
      });
  } catch (error) {
    console.error(error);
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth
      .signInWithPopup(googleProvider)
      .then(() => {
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true,
        });
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
  userError: [],
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});

export const signUpUser = (userCredentials) => ({
  type: userTypes.SIGN_UP_USER,
  payload: userCredentials,
});

export const userError = (error) => ({
  type: userTypes.USER_ERROR,
  payload: error,
});

export const resetPasswordStart = (userCredentials) => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials,
});

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true,
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE,
});
