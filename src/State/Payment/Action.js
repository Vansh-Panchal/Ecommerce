import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST } from "./ActionType";
import { api } from "../../config/apiConfig";

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });

  try {
    console.log(orderId);
    const  {data}  = await api.post(`/api/payment/${orderId}`, {});
    console.log("data ",data);
    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
  } catch (error) {
    console.log("error  ",error);
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      
      payload: error.message,
    });
  }
};

// export const updatePaymentRequest = ({ orderId, paymentId }) => async (dispatch) => {
//   dispatch({ type: CREATE_PAYMENT_REQUEST });

//   try {
//     await api.get(
//       `/api/payments?razorpay_payment_id=${paymentId}&order_id=${orderId}`
//     );
//   } catch (error) {
//     dispatch({
//       type: CREATE_PAYMENT_FAILURE,
//       payload: error.message,
//     });
//   }
// };
export const updatePaymentRequest = ({ orderId, paymentId, paymentLinkId }) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });

  try {
    // Send both params the backend expects
    await api.get(
      `/api/payments?razorpay_payment_id=${encodeURIComponent(paymentId)}&razorpay_payment_link_id=${encodeURIComponent(paymentLinkId)}`
    );
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload: error.message,
    });
  }
};