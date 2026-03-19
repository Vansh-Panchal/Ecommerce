import { api } from "../../config/apiConfig";
import {
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAILURE,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_FAILURE,
  GET_PRODUCTS_BY_CATEGORY_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
} from "./ActionType";

// ── Find products with filters + pagination ──────────────────────────
export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  try {
    const { data } = await api.get("/api/products", {
      params: {
        category:    reqData.category    || null,
        color:       reqData.colors?.length  ? reqData.colors  : null,
        size:        reqData.sizes?.length   ? reqData.sizes   : null,
        minPrice:    reqData.minPrice,
        maxPrice:    reqData.maxPrice,
        minDiscount: reqData.minDiscount,
        stock:       reqData.stock,
        sort:        reqData.sort,
        pageNumber:  reqData.pageNumber,
        pageSize:    reqData.pageSize,
      },
      paramsSerializer: { indexes: false },
    });
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

// ── Find product by ID ────────────────────────────────────────────────
export const findProductsById = (productId) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/products/${productId}`);
    console.log("product by id:", data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

// ── Create product (admin) ────────────────────────────────────────────
export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCTS_REQUEST });
    const { data } = await api.post("/api/admin/products", product);
    console.log("product created:", data);
    dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
  }
};

// ── Delete product (admin) ────────────────────────────────────────────
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });
    await api.delete(`/api/admin/products/${productId}`);
    dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.message });
  }
};

// ── Get products by category (for homepage carousels) ─────────────────
export const getProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_BY_CATEGORY_REQUEST });

    const { data } = await api.get("/api/products", {
      params: {
        category:   category,
        pageSize:   10,
        pageNumber: 0,
      },
    });

    dispatch({
      type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
      payload: {
        category,
        data: data.content, // ✅ Page object → extract .content array
      },
    });

    console.log(`products [${category}]:`, data.content);
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_BY_CATEGORY_FAILURE, payload: error.message });
    console.error(error);
  }
};

// ── Search products ───────────────────────────────────────────────────
export const searchProducts = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_PRODUCTS_REQUEST });
  try {
    const { data } = await api.get(
      `/api/products/search?keyword=${encodeURIComponent(keyword)}`
    );
    dispatch({ type: SEARCH_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEARCH_PRODUCTS_FAILURE, payload: error.message });
  }
};