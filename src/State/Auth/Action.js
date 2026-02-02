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

/* REGISTER */
export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/signup`,
            userData
        );

        if (response.data.jwt) {
            localStorage.setItem("jwt", response.data.jwt);
        }

        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
};

/* LOGIN */
export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/signin`,
            userData
        );

        if (response.data.jwt) {
            localStorage.setItem("jwt", response.data.jwt);
            // Log JWT token for debugging (stored securely in localStorage)
            console.log("JWT Token received:", response.data.jwt);
        }

        dispatch({ type: LOGIN_SUCCESS, payload: response.data.jwt });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

/* GET USER */
export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    try {
        const jwt = localStorage.getItem("jwt");

        const response = await axios.get(
            `${API_BASE_URL}/api/users/profile`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
};
