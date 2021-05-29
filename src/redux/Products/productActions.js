import productTypes from "./productTypes";

export const addProductStart = (productData) => ({
  type: productTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});

export const fetchProductsStart = () => ({
  type: productTypes.FETCH_PRODUCTS_START,
});

export const setProducts = (products) => ({
  type: productTypes.SET_PRODUCTS,
  payload: products,
});

export const deleteProductsStart = (productId) => ({
  type: productTypes.DELETE_PRODUCT_START,
  payload: productId,
});
