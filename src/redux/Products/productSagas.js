/* eslint-disable no-unused-vars */
import { takeLatest, all, call, put } from "redux-saga/effects";
import { auth } from "../../firebase/utils";
import {
  addProductStart,
  setProducts,
  fetchProductsStart,
} from "./productActions";
import {
  handleAddProduct,
  handleFetchProducts,
  handleProductDelete,
} from "./productHelpers";
import productTypes from "./productTypes";

export function* addProduct({
  payload: { productCategory, productName, productThumbnail, productPrice },
}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
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
export function* fetchProducts() {
  try {
    const products = yield handleFetchProducts();
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
export default function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProduct),
    call(onDeleteProductStart),
  ]);
}
