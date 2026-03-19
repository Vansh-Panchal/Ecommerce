
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS } from "./ActionType";
import { api } from "../../config/apiConfig";



export const createOrder = (reqData)=>async(dispatch)=>{
    console.log("req data ", reqData);
    dispatch({type:CREATE_ORDER_REQUEST});
    try {
        
        // const config = {
        //     headers:{
        //         "Content-Type":  "application/json",
        //         Authorization : `Bearer ${reqData.jwt}`,
        //     },
        // };
        const {data} = await api.post(`/api/orders`,reqData.address);
        if(data.id){
            reqData.navigate({search: `step=3&order_id=${data.id}`});
        }
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data});

    } catch (error) {
        console.log("error is ",error);
        dispatch({type:CREATE_ORDER_FAILURE,payload:error.message});
    }
}
export const getOrderById = (orderId)=>async(dispatch)=>{
    // console.log("req data ", reqData);
    dispatch({type:GET_ORDER_BY_ID_REQUEST});
    try {
        
        // const config = {
        //     headers:{
        //         "Content-Type":  "application/json",
        //         Authorization : `Bearer ${reqData.jwt}`,
        //     },
        // };
        const {data} = await api.get(`/api/orders/${orderId}`);
        console.log("Order by id is  ",data)
        dispatch({type:GET_ORDER_BY_ID_SUCCESS,payload:data});

    } catch (error) {
        console.log("error is ",error);
        dispatch({type:GET_ORDER_BY_ID_FAILURE,payload:error.message});
    }
}

export const getOrderHistory = (reqData) => async (dispatch) => {
    dispatch({ type: GET_ORDER_HISTORY_REQUEST });

    try {
        // Pass the status as a query parameter: /api/orders/user?status=delivered
        const { data } = await api.get(`/api/orders/user`, {
            params: { status: reqData.status }
        });
        
        console.log("Filtered Order History:", data);
        
        dispatch({
            type: GET_ORDER_HISTORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ORDER_HISTORY_FAILURE,
            payload: error.message,
        });
    }
};