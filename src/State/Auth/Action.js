import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

/* ================= REGISTER ================= */

export const register = (userData) => async (dispatch) => {

  dispatch({ type: REGISTER_REQUEST });

  try {

    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      userData
    );

    alert(data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });

  } catch (error) {

    console.log("Register error:", error);

    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data || error.message,
    });

  }
};

/* ================= LOGIN ================= */

export const login = (userData, navigate) => async (dispatch) => {
  try {

    const { data } = await axios.post(
      "http://localhost:5454/auth/signin",
      userData
    );

    console.log("LOGIN RESPONSE", data);

    // save token
    localStorage.setItem("jwt", data.jwt);

    // save role
    localStorage.setItem("role", data.role);

    // redirect based on role
    if (data.role === "ROLE_ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.log("LOGIN ERROR", error);
  }
};


/* ================= GET USER PROFILE ================= */

export const getUser = () => async (dispatch) => {

  dispatch({ type: GET_USER_REQUEST });

  try {

    const jwt = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });

  } catch (error) {

    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });

  }

};

/* ================= UPDATE USER ================= */

export const updateUser = (userData) => async (dispatch) => {

  dispatch({ type: GET_USER_REQUEST });

  try {

    const jwt = localStorage.getItem("jwt");

    const { data } = await axios.put(
      `${API_BASE_URL}/api/users/profile`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });

  } catch (error) {

    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });

  }

};

/* ================= LOGOUT ================= */

export const logout = () => (dispatch) => {

  localStorage.removeItem("jwt");
  localStorage.removeItem("role");

  dispatch({
    type: LOGOUT,
  });

};

export const updateAddress = (id,data) => async (dispatch) => {

    const jwt = localStorage.getItem("jwt");

    await axios.put(
        `${API_BASE_URL}/api/address/${id}`,
        data,
        { headers:{Authorization:`Bearer ${jwt}`} }
    );

    dispatch(getUser());
};

export const deleteAddress = (id) => async (dispatch) => {
  try {

    await axios.delete(`http://localhost:5454/api/address/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    // remove deleted address from UI
    setAddresses(addresses.filter((address) => address.id !== id));

    alert("Address deleted successfully");

  } catch (error) {

    if (error.response && error.response.status === 403) {
      alert("This address is used in an order and cannot be deleted.");
    } else {
      alert("Something went wrong while deleting the address.");
    }

    console.error(error);
  }
};


export const addAddress = (data) => async (dispatch) => {

    const jwt = localStorage.getItem("jwt");

    const data = await axios.post(
        `${API_BASE_URL}/api/address`,
        data,
        { headers:{Authorization:`Bearer ${jwt}`} }
    );
    console.log("saved address  ",data)

    dispatch(getUser());
};