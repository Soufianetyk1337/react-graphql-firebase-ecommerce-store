/* eslint-disable no-unused-vars */
import { takeLatest, all, call, put } from "redux-saga/effects";
import { auth } from "../../firebase/utils";
import {
  addProductStart,
  setProducts,
  fetchProductsStart,
  fetchSingleProductStart,
  setProduct,
} from "./productActions";
import {
  handleAddProduct,
  handleFetchProduct,
  handleFetchProducts,
  handleProductDelete,
} from "./productHelpers";
import productTypes from "./productTypes";

export function* addProduct({ payload }) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      ...payload,
      productAdminUserUID: auth.currentUser.uid,
      created_at: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (error) {
    console.error(error);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct);
}
export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products));
  } catch (error) {
    console.error(error);
  }
}

export function* onFetchProduct() {
  yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}
export function* onDeleteProductStart() {
  yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}
export function* deleteProduct({ payload }) {
  try {
    yield handleProductDelete(payload);
    yield put(fetchProductsStart());
  } catch (error) {
    console.error(error);
  }
}

export function* fetchSingleProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (error) {
    console.error(error);
  }
}
export function* onFetchSingleProductStart() {
  yield takeLatest(productTypes.FETCH_SINGLE_PRODUCT_START, fetchSingleProduct);
}
export default function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProduct),
    call(onDeleteProductStart),
    call(onFetchSingleProductStart),
  ]);
}
