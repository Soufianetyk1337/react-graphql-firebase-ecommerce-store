import productTypes from "./productTypes";

export const addProductStart = (productData) => ({
  type: productTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});

export const fetchProductsStart = (filter = {}) => ({
  type: productTypes.FETCH_PRODUCTS_START,
  payload: filter,
});

export const setProducts = (products) => ({
  type: productTypes.SET_PRODUCTS,
  payload: products,
});

export const deleteProductsStart = (productId) => ({
  type: productTypes.DELETE_PRODUCT_START,
  payload: productId,
});

export const fetchSingleProductStart = (productId) => ({
  type: productTypes.FETCH_SINGLE_PRODUCT_START,
  payload: productId,
});

export const setProduct = (product) => ({
  type: productTypes.SET_PRODUCT,
  payload: product,
});
