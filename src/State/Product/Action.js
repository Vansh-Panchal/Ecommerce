import { api } from "../../config/apiConfig";
import {
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  try {
    const { data } = await api.get("/api/products", {
      params: {
        category: reqData.category || null,
        color: reqData.colors?.length ? reqData.colors : null,
        size: reqData.sizes?.length ? reqData.sizes : null,
        minPrice: reqData.minPrice,
        maxPrice: reqData.maxPrice,
        minDiscount: reqData.minDiscount,
        stock: reqData.stock,
        sort: reqData.sort,
        pageNumber: reqData.pageNumber,
        pageSize: reqData.pageSize,
      },
      paramsSerializer: {
        indexes: false, // VERY IMPORTANT
      },
    });

    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  
  try {
    const { data } = await api.get(`/api/products/${reqData.productId}`);
    console.log("data ",data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};
