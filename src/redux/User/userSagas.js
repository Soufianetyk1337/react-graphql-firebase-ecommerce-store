/* eslint-disable no-unused-vars */
import userTypes from "./userTypes";
import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  auth,
  getCurrentUser,
  handleUserProfile,
  googleProvider,
} from "../../firebase/utils";
import {
  signInSuccess,
  signOutUserSuccess,
  userError,
  resetPasswordSuccess,
} from "./userActions";
import { handleResetPassword } from "./userHelpers";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (error) {
    console.error(error);
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    console.error(error);
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    console.error(error);
  }
}
export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (error) {
    console.error(error);
  }
}
export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}
export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    console.error(err);
  }
}
export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}
export function* signUpUser({
  payload: { displayName, password, email, confirmPassword },
}) {
  if (password !== confirmPassword) {
    const error = ["Password don't match"];
    yield put(userError(error));
    return;
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    yield getSnapshotFromUserAuth(user, additionalData);
  } catch (error) {
    console.error(`error`, error);
  }
}
export function* resetPassword({ payload: { email } }) {
  try {
    yield call(handleResetPassword, email);
    yield put(resetPasswordSuccess());
  } catch (error) {
    yield put(userError(error));
  }
}
export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}
export function* onSignUpUser() {
  yield takeLatest(userTypes.SIGN_UP_USER, signUpUser);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onGoogleSignInStart),
    call(onSignUpUser),
    call(onResetPasswordStart),
  ]);
}
