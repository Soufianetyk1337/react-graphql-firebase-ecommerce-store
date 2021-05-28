// eslint-disable-next-line no-unused-vars
import { call, all } from "redux-saga/effects";
import userSagas from "./User/userSagas";

export default function* rootSaga() {
  yield all([call(userSagas)]);
}
