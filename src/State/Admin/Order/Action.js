import { api } from "../../../config/apiConfig";
import { CANCEL_ORDERS_FAILURE, CANCEL_ORDERS_REQUEST, CANCEL_ORDERS_SUCCESS, CONFIRMED_ORDERS_FAILURE, CONFIRMED_ORDERS_REQUEST, CONFIRMED_ORDERS_SUCCESS, DELETE_ORDERS_FAILURE, DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS, DELIVERED_ORDERS_FAILURE, DELIVERED_ORDERS_REQUEST, DELIVERED_ORDERS_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, SHIP_ORDERS_FAILURE, SHIP_ORDERS_REQUEST, SHIP_ORDERS_SUCCESS } from "./ActionType";


export const getOrders = () => {
    console.log("get all orders")
    return async (dispatch) => {
        dispatch({type: GET_ORDERS_REQUEST });
        try {
            const response = await api.get(`/api/admin/orders`);
            console.log("get all orders", response.data)
            dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("catch error ", error)
            dispatch({ type: GET_ORDERS_FAILURE, payload: error.message })
        }
    };
};

export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRMED_ORDERS_REQUEST });

    try {
        const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
        const data = response.data;
        console.log("Confirm order  ", data);
        dispatch({ type: CONFIRMED_ORDERS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: CONFIRMED_ORDERS_FAILURE, payload: error.message })
    }
};

export const shipOrder = (orderId) => async (dispatch) => {
    dispatch({ type: SHIP_ORDERS_REQUEST });

    try {
        const response = await api.put(`/api/admin/orders/${orderId}/shipped`);
        const data = response.data;
        console.log("Shipped order  ", data);
        dispatch({ type: SHIP_ORDERS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: SHIP_ORDERS_FAILURE, payload: error.message })
    }
};

export const deliveredOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELIVERED_ORDERS_REQUEST });

    try {
        const response = await api.put(`/api/admin/orders/${orderId}/delivered`);
        const data = response.data;
        console.log("Delivered order  ", data);
        dispatch({ type: DELIVERED_ORDERS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: DELIVERED_ORDERS_FAILURE, payload: error.message })
    }
};

export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCEL_ORDERS_REQUEST });

    try {
        const response = await api.put(`/api/admin/orders/${orderId}/canceled`);
        const data = response.data;
        console.log("Cancel order  ", data);
        dispatch({ type: CANCEL_ORDERS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: CANCEL_ORDERS_FAILURE, payload: error.message })
    }
};

export const deleteOrder = (orderId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_ORDERS_REQUEST });

        try {
            const response = await api.delete(`/api/admin/orders/${orderId}`);
            const data = response.data;
            console.log("Delete order  ", data);
            dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data });

        } catch (error) {
            dispatch({ type: DELETE_ORDERS_FAILURE, payload: error.message })
        }
    };
};



