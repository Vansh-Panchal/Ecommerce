// import { api } from "../../config/apiConfig";
import { api } from "../../../config/apiConfig";
import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
  GET_CUSTOMER_FAILURE,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_REQUEST
} from "./ActionType";

export const getCustomers = () => async (dispatch) => {

  dispatch({ type: GET_CUSTOMERS_REQUEST });

  try {

    const { data } = await api.get("/api/admin/users");

    dispatch({
      type: GET_CUSTOMERS_SUCCESS,
      payload: data
    });

  } catch (error) {

    console.log("CUSTOMER ERROR", error);

    dispatch({
      type: GET_CUSTOMERS_FAILURE,
      payload: error.response?.data?.message || error.message
    });

  }
};


// DELETE CUSTOMER
export const deleteCustomer = (customerId) => async (dispatch) => {

  dispatch({ type: DELETE_CUSTOMER_REQUEST });

  try {

    await api.delete(`/api/admin/users/${customerId}`);

    dispatch({
      type: DELETE_CUSTOMER_SUCCESS,
      payload: customerId
    });

  } catch (error) {

    dispatch({
      type: DELETE_CUSTOMER_FAILURE,
      payload: error.message
    });

  }

};

export const getCustomerById = (id) => async (dispatch) => {

  dispatch({ type: GET_CUSTOMER_REQUEST });

  try {

    const { data } = await api.get(`/api/admin/users/${id}`);
    console.log("get user by idd   ", data);
    dispatch({
      type: GET_CUSTOMER_SUCCESS,
      payload: data
    });

  } catch (error) {

    dispatch({
      type: GET_CUSTOMER_FAILURE,
      payload: error.message
    });

  }

};